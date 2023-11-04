import { useState, useEffect } from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./ImageSlider.css";
import logo from '../../assets/logo.png';
import { FaPlay } from "react-icons/fa6";

const images = [
    {
        id: 1,
        imageUrl: 'https://www.movieposters.com/cdn/shop/products/2d980ab744ac2b98bec26af9ab98e697_1aebb70a-0afe-48bd-9b0f-63ab8d4cfee6_480x.progressive.jpg?v=1573585463',
        content: 'LET ME SEE--HOW',
    },
    {
        id: 2,
        imageUrl: 'https://www.movieposters.com/cdn/shop/products/akira.2020.imax_480x.progressive.jpg?v=1597332258',
        content: 'HOWEVER, WHEN',
    },
    {
        id: 3,
        imageUrl: 'https://www.movieposters.com/cdn/shop/files/scan009_ac831d52-2425-498c-b1cc-92fa19670c76_480x.progressive.jpg?v=1687292020',
        content: 'THEN SHE WENT BACK',
    }
];


const carousel = (slider) => {
    const z = 300
    function rotate() {
        const deg = 360 * slider.track.details.progress
        slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`
    }
    slider.on("created", () => {
        const deg = 360 / slider.slides.length
        slider.slides.forEach((element, idx) => {
            element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`
        })
        rotate()
    })
    slider.on("detailsChanged", rotate)
}

export default function App() {
    const [sliderRef] = useKeenSlider(
        {
            loop: true,
            selector: ".carousel__cell",
            renderMode: "custom",
            mode: "free-snap",
        },
        [carousel]
    )

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const renderImage = (index) => {
        const image = images[index];
        return (
            <div key={image.id}>
                <img
                    src={image.imageUrl}
                    alt={`Slide ${image.id}`}
                    className="md:object-fit rounded-lg"
                />
            </div>
        );
    };

    return (
        <div className="md:flex items-center justify-center md:w-full md:h-2/3 mobile-res">
            <div className="wrapper md:w-1/2">
                <div className="scene">
                    <div className="carousel keen-slider" ref={sliderRef}>
                        <div className="carousel__cell number-slide1">
                            <div className="">{renderImage(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1)}</div>
                        </div>
                        <div className="carousel__cell number-slide2">
                            <div className="">{renderImage(currentImageIndex)}</div>
                        </div>
                        <div className="carousel__cell number-slide3">
                            <div className="">{renderImage((currentImageIndex + 1) % images.length)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-6 text-white md:w-1/2 md:mr-10">
                <h2 className="text-lg font-semibold mb-1">COMING SOON</h2>
                <h1 className='text-2xl font-semibold mb-4'>{images[currentImageIndex].content}</h1>
                <div className='flex justify-between border-y text-gray-300 py-2'>
                    <p className='my-2'><span className='text-sm'>2019 - Movie - 2h 10m</span></p>
                    <div className='flex items-center'>
                        <img src={logo} className='h-5 w-12' alt="" /> <span className='ml-2 text-sm'>7.4</span>
                    </div>
                </div>
                <div className='my-4 '>
                    <p className='text-xs '>Recent buzz suggests that Yash Raj Films has already planned a bumper Diwali surprise, which is called Kabir! Yes, you read that right. If the buzz is true, then Tiger 3...<span className='text-[#F6C800] font-semibold'>Read More</span> </p>
                </div>
                <button className="px-3 py-2 btn-warning my-4 rounded flex items-center text-white"> <FaPlay className='mr-2 font-bold' size={22} /><span className='text-sm '> Watch Now</span></button>
            </div>
        </div>
    )
}