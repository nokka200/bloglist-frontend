import React from 'react';

const CreateNewBlog = ({handleNewBlog, blogTitle, blogAuthor, blogUrl, setBlogTitle, setBlogAuthor, setBlogUrl}) => { 

    const addBlog = (event) => { 

    }
    
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleNewBlog}>
                <div>title: <input
                    type="text"
                    value={blogTitle}
                    name="Title"
                    onChange={({ target }) => setBlogTitle(target.value)}
                />
                </div>
                <div>author: <input
                    type="text"
                    value={blogAuthor}
                    name="Author"
                    onChange={({ target }) => setBlogAuthor(target.value)}
                />
                </div>
                <div>url: <input
                    type="text"
                    value={blogUrl}
                    name="Url"
                    onChange={({ target }) => setBlogUrl(target.value)}
                />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateNewBlog;