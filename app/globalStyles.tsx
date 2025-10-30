export const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
    
    :root { scroll-behavior: smooth; }
    
    body {
        font-family: 'Inter', sans-serif;
        background-color: #0d1117; 
        color: #c9d1d9;
    }

    .gradient-text {
        background-image: linear-gradient(to right, #6EE7B7, #34D399, #10B981);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .tilt-card {
        box-shadow: none; 
        border: 1px solid transparent; 
        transition: transform 0.1s ease-out, box-shadow 0.3s ease-out, border 0.3s ease-out; 
        perspective: 1000px;
        transform-style: preserve-3d; 
        position: relative; 
        z-index: 10;
    }
    
    .tilt-card:hover {
        transform: none; 
        border-color: transparent; 
    }

    /* FIX: Ensure the React icon's ellipses have the correct background color */
    /* Match the body background color */
    .react-logo svg ellipse {
        fill: #0d1117 !important; 
    }

    .skill-doc-link {
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.3s, visibility 0.3s;
        position: absolute;
        bottom: 0.5rem;
        right: 0.5rem;
        display: flex;
        align-items: center;
        /* Ensure the link doesn't interfere with the main tilt handler */
        pointer-events: none; 
    }

    .tilt-card:hover .skill-doc-link {
        visibility: visible;
        opacity: 1;
        pointer-events: auto; /* Re-enable pointer events on hover */
    }

    /* React Logo Animation Keyframes */
    @keyframes react-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    /* Apply spin directly to the SVG when the parent component is hovered */
    .react-logo-wrapper:hover .react-spin-target {
        animation: react-spin 10s linear infinite;
    }
`;
