import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import BlogPost from "../components/BlogPost";
import { useHttpClient } from "../shared/hooks/http-hook";
import LoadingSpinner from "../shared/ui-elements/LoadingSpinner";

const Home = () => {

    const [loadedBlogs, setLoadedBlogs] = useState();
    const { sendRequest, error, isLoading, clearError } = useHttpClient();

    useEffect(() => {
        const fetchBlogs = async () => {

            try {
                const response = await sendRequest("blogs");
                setLoadedBlogs(response.blogs);
            } catch (err) {

            }

        };
        fetchBlogs();
    }, [sendRequest]);

    return (

        <React.Fragment>
            {isLoading &&
                <div className="absolute z-50 div-center-sereen">
                    <LoadingSpinner />
                </div>
            }

            <div className="w-full h-screen flex justify-center items-center px-10 py-5 drop-shadow-md">
                <div className="bg-wild-sand px-5 py-3 rounded-md w-full h-full flex flex-wrap justify-around">

                    {
                        !isLoading && loadedBlogs && loadedBlogs.map(blog =>
                            <BlogPost
                                key={blog.id}
                                url={blog.image}
                                title={blog.title}
                                content={blog.content}
                            />
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;