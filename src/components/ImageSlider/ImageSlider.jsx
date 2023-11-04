import { useState, useEffect } from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./App.css"
import logo from './assets/logo.png';


const images = [
    {
        id: 1,
        imageUrl: 'https://i.ibb.co/mt2PG8N/image-11.jpg',
        content: 'However, When',
    },
    {
        id: 2,
        imageUrl: 'https://i.ibb.co/RDf7G28/image-10.jpg',
        content: 'Then She Went Back.',
    },
    {
        id: 3,
        imageUrl: 'https://i.ibb.co/QFM28Vj/image-9.webp',
        content: 'Half Past One',
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
        }, 3000); // Change the image every 3 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    const renderImage = (index) => {
        const image = images[index];
        return (
            <div key={image.id} className="">
                <img
                    src={image.imageUrl}
                    alt={`Slide ${image.id}`}
                    className="w-full"
                />
            </div>
        );
    };

    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <div className="flex items-center justify-center h-screen border">
                <div className="wrapper">
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
                <div className="w-full p-8">
                    <h2 className="text-2xl font-bold mb-4">Comming Soon</h2>
                    <p>{images[currentImageIndex].content}</p>
                    <div className='flex'>
                        <h2>2019 - Movie - 2h 10m</h2>
                        <img src={logo} className='h-8 w-12' alt="" /> 7.4
                    </div>
                </div>
            </div>
        </div>
    )
}