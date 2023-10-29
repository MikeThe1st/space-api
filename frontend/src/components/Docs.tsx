import React from 'react'

interface IrequestData {
    title: string;
    url: string;
    description: string;
    parameters: {
        param: string;
        type: string;
        description: string;
        default: string;
        required: boolean;
    }[];
}

const requestData: IrequestData[] = [
    {
        title: 'Picture of the day request',
        url: 'mypath/api/picture-of-the-day?api_key=YOUR_API_KEY',
        description: 'Best todays picture or video from space.',
        parameters: [
            {
                param: 'api_key',
                type: 'String',
                description: 'Your API key from the dashboard',
                default: 'none',
                required: true,
            }
        ]
    },
    {
        title: 'Near Earth asteroids request',
        url: 'mypath/api/near-earth-asteroids?api_key=YOUR_API_KEY',
        description: 'Data about asteroids close to earth and whether they might be dangerous or not.',
        parameters: [
            {
                param: 'api_key',
                type: 'String',
                description: 'Your API key from the dashboard',
                default: 'none',
                required: true,
            }
        ]
    },
    {
        title: 'Mars Rover Photos',
        url: 'mypath/api/mars-rover-photos?api_key=YOUR_API_KEY&photos=NUMBER_OF_PHOTOS',
        description: 'Photos taken by Mars Rover on the Mars planet.',
        parameters: [
            {
                param: 'api_key',
                type: 'String',
                description: 'Your API key from the dashboard',
                default: 'none',
                required: true,
            },
            {
                param: 'photos',
                type: 'String',
                description: 'Number of photos you want to get from 1 to 100.',
                default: '1',
                required: false,
            }
        ]
    },
];


const Docs = () => {
    return (
        <main className="mx-auto px-5 pt-28 text-white min-h-screen h-fit mb-20">
            <div className="flex flex-col items-center">
                <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl mt-5 tracking-tight">
                    API Docs
                </h2>
                <p className="text-neutral-500 text-base sm:text-xl mt-3">
                    List of possible requests
                </p>
            </div>
            <div className="max-w-5xl mx-auto mt-8 overflow-x-auto">
                <div className="grid divide-y divide-neutral-200 text-base sm:text-lg lg:text-xl gap-10 lg:gap-16">
                    {requestData.map((item) => (
                        <div key={item.title} className="py-4 bg-gray-800 rounded-xl px-6">
                            <details className="group">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                    <span className='text-gradient text-2xl sm:text-3xl font-bold my-4'>{item.title}</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </summary>
                                <div>
                                    <div className='font-semibold opacity-80 p-2'>{item.description}</div>
                                    <div className='py-2'>
                                        <div className='m-2'>Method: <span className='text-green-500'>GET</span></div>
                                        <div className='m-2'>Request URL: {item.url}</div>
                                    </div>
                                </div>
                                <table className="table-auto w-full border border-white text-center bg-gray-700">
                                    <thead>
                                        <tr>
                                            <th className='border border-gray-400'>Parameter</th>
                                            <th className='border border-gray-400'>Type</th>
                                            <th className='border border-gray-400'>Description</th>
                                            <th className='border border-gray-400'>Default</th>
                                            <th className='border border-gray-400'>Required</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.parameters.map((param) => (
                                            <tr key={param.param}>
                                                <td className='border border-gray-400'>{param.param}</td>
                                                <td className='border border-gray-400'>{param.type}</td>
                                                <td className='border border-gray-400'>{param.description}</td>
                                                <td className='border border-gray-400'>{param.default}</td>
                                                <td className='border border-gray-400'>{param.required ? 'Yes' : 'No'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </details>
                        </div>
                    ))}
                </div>
            </div>
        </main>

    )
}

export default Docs