import React from 'react';
import img from "../../assets/img/maintenance.svg";
import BackButton from '../../components/BackButton';

export default function Maintenance() {
    return (
        <div className="flex flex-col justify-center items-center px-6 mx-auto h-screen xl:px-0 dark:bg-gray-900">
            <div className="block mb-5 md:max-w-md">
                <img src={img} alt="maintenance image" />
            </div>
            <div className="text-center xl:max-w-4xl">
                <h1 class="mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                    Under Maintenance
                </h1>
                <p className="text-base font-normal text-gray-500 md:text-lg dark:text-gray-400">
                    Sorry for the inconvenience but we’re performing some maintenance at the moment.
                </p>
                <p className="mb-5 text-base font-normal text-gray-500 md:text-lg dark:text-gray-400">
                    Please check back later!
                </p>
                <div className="flex justify-center"><BackButton /></div>
            </div>
        </div >
    )
}