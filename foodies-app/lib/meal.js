import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { S3 } from '@aws-sdk/client-s3';
import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";

const stsClient = new STSClient({ region: "us-east-2" });

async function getTemporaryCredentials() {
    const command = new AssumeRoleCommand({
        RoleArn: "arn:aws:iam::067258969310:role/Foodies-NextJS-App-S3-Access",
        RoleSessionName: "FoodiesNextJSAppSession",
    });

    const response = await stsClient.send(command);
    //console.log("Temporary Credentials:", response.Credentials);
    return response.Credentials;
}

const credentials = await getTemporaryCredentials();

const s3 = new S3({
	region:'us-east-2',
	endpoint: "https://s3.us-east-2.amazonaws.com",
	credentials: {
        accessKeyId: credentials.AccessKeyId,
        secretAccessKey: credentials.SecretAccessKey,
        sessionToken: credentials.SessionToken
    }
});

const db = sql('meals.db');

export async function getMeals() {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	//throw new Error('Loading meals failed');
	return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
	return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {

	/* 
		const slug = slugify(meal.title, { lower: true });
		const instructions = xss(meal.instructions); --> Sanitizing code
	*/

	//console.log('Saving meal')

	meal.slug = slugify(meal.title, { lower: true });
	meal.instructions = xss(meal.instructions);

	const extension = meal.image.name.split('.').pop();
	const fileName = `${meal.slug}.${extension}`

	const bufferedImage = await meal.image.arrayBuffer();

	s3.putObject({
		Bucket: 'ossant-nextjs-demo-users-image',
		Key: fileName,
		Body: Buffer.from(bufferedImage),
		ContentType: meal.image.type,
	});

	meal.image = fileName;

	//console.log(fileName)

	db.prepare(`
		INSERT INTO meals (
			title, summary, instructions, creator, creator_email, image, slug
		)
		VALUES (
			@title, @summary, @instructions, @creator, @creator_email, @image, @slug
		)
	`).run(meal);

}