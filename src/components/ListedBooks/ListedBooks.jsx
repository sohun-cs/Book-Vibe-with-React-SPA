import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getStoredBookApplication } from "../../utils/local-storage";


const ListedBooks = () => {

    const [tab, setTab] = useState(0);

    const books = useLoaderData();
    const [filtering, setFiltering] = useState([])


    const handleBookFiler = filter => {

        const storedBookIds = getStoredBookApplication();
        for (const id of storedBookIds) {
            if (filter === 'all') {
                setFiltering(filtering)
                console.log("read-list: ", filtering);
            }
            else if (filter === 'pages') {
                const pages = books.filter(book => book.totalPages && book.id === id)
                console.log("pages: ", pages);
                setFiltering(pages)
            }
            else if (filter === 'published-year') {
                const year = books.filter(book => book.yearOfPublishing && book.id === id);
                console.log("year: ", year);
                setFiltering(year)
            }
        }

    }

    return (
        <div>
            <div>
                <details className="dropdown">
                    <summary className="m-1 btn">open or close</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li onClick={() => handleBookFiler('all')}><a>Rating</a></li>
                        <li onClick={() => handleBookFiler('pages')}><a>Number of pages</a></li>
                        <li onClick={() => handleBookFiler('published-year')}><a>Publisher year</a></li>
                    </ul>
                </details>
            </div>
            <div className="flex items-center lg:-mx-4 overflow-x-auto overflow-y-hidden sm:justify-start flex-nowrap dark:bg-gray-100 dark:text-gray-800">
                <Link to=""
                    onClick={() => setTab(0)}
                    className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 ${tab === 0 ? 'border border-b-0' : 'border-b'} rounded-t-lg dark:border-gray-600 dark:text-gray-900`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>Read list</span>
                </Link>

                <Link to={`wishlist`}
                    onClick={() => setTab(1)}
                    className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 ${tab === 1 ? 'border border-b-0' : 'border-b'} rounded-t-lg dark:border-gray-600 dark:text-gray-900`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                    <span>Wishlist</span>

                </Link>


            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default ListedBooks;