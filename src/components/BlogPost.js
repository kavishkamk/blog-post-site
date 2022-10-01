import React from "react";

const BlogPost = props => {
    return (
        <div className="bg-white p-4 w-64 rounded-md mx-2 my-3 h-fit drop-shadow-xl">
            <div className="w-full h-56 rounded-md">
                <img src={`${process.env.REACT_APP_ASSET_URL}${props.url}`} alt="" className="rounded-md" />
            </div>
            <div className="whitespace-nowrap overflow-x-hidden font-bold mb-2">{props.title}</div>
            <div className="overflow-hidden h-40">{props.content}</div>
        </div>
    );
};

export default BlogPost;