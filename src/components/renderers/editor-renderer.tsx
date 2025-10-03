import React, { useEffect, useRef } from 'react';
import { EditorRenderer as CoreEditorRenderer } from '@planara/core';

const EditorRenderer: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<CoreEditorRenderer | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        rendererRef.current = new CoreEditorRenderer(canvasRef.current);
        rendererRef.current.loop();

        const canvas = canvasRef.current!;
        const width = 1500;
        const height = 800;

        canvas.width = width;
        canvas.height = height;

        rendererRef.current.gl.setSize(width, height);
        rendererRef.current.camera.perspective({ aspect: width / height });

        const handleResize = () => rendererRef.current?.resize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            rendererRef.current = null;
        };
    }, []);

    return <canvas ref={canvasRef} />;
};

export default EditorRenderer;
