// components/GeoCanvas.js
import { useEffect, useRef } from 'react';

const GeoCanvas = ({ coordinates }: {coordinates: GeolocationCoordinates[]}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Helper function to convert latitude/longitude to canvas coordinates
    const geoToCanvas = (lat: number, lon: number, width: number, height: number) => {
        // Assuming an equirectangular projection
        const x = (lon + 180) * (width / 360);
        const y = (90 - lat) * (height / 180);
        return { x, y };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (canvas && context) {
            // Set canvas dimensions (could also be passed as props)
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Clear the canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Begin drawing the path
            context.beginPath();
            coordinates.forEach((coord, index) => {
                const { x, y } = geoToCanvas(coord.latitude, coord.longitude, canvas.width, canvas.height);

                if (index === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }
            });

            // Set style and draw
            context.strokeStyle = '#FF0000'; // Line color
            context.lineWidth = 2; // Line width
            context.stroke();
        }
    }, [coordinates]);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '300px' }} />;
};

export default GeoCanvas;
