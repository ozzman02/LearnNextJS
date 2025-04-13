import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Posts, { postsLoader } from './routes/Posts.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NewPost, { createPostAction } from './routes/NewPost.jsx'
import RootLayout from './routes/RootLayout.jsx'
import PostDetails, { postDetailsLoader } from './routes/PostDetails.jsx'

const router = createBrowserRouter([
	{ 
		path: '/', 
		element: <RootLayout />, 
		HydrateFallback: () => null,
		children: [
			{ 
				path: '/', 
				element: <Posts />, 
				loader: postsLoader,
				children: [
					{ 
						path: '/create-post', 
						element: <NewPost />, 
						action: createPostAction 
					},
					{
						path: '/:id',
						element: <PostDetails />,
						loader: postDetailsLoader

					}
				] 
			},
		]
	}
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
    	<RouterProvider router={router} />
  	</StrictMode>,
)
