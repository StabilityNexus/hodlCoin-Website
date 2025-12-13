<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>hodlCoin Staking Platform</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #ffffff;
            color: #1a1a1a;
            overflow-x: hidden;
        }

        /* Matrix Effect Canvas */
        #matrixCanvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            opacity: 0.15;
        }

        /* Hero Section */
        .hero-section {
            position: relative;
            min-height: 90vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem 1rem;
            margin-top: 1rem;
            overflow: hidden;
        }

        .gradient-bg {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
            z-index: 1;
        }

        .glow-effects {
            position: absolute;
            inset: 0;
            z-index: 2;
            opacity: 0.3;
        }

        .glow {
            position: absolute;
            border-radius: 50%;
            filter: blur(60px);
            animation: pulse 4s ease-in-out infinite;
        }

        .glow-1 {
            top: 25%;
            right: 25%;
            width: 160px;
            height: 160px;
            background: rgba(147, 51, 234, 0.2);
        }

        .glow-2 {
            bottom: 33%;
            left: 25%;
            width: 128px;
            height: 128px;
            background: rgba(168, 85, 247, 0.15);
            animation-delay: 2s;
        }

        .glow-3 {
            top: 50%;
            left: 33%;
            width: 96px;
            height: 96px;
            background: rgba(192, 132, 252, 0.1);
            animation-delay: 4s;
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
        }

        .hero-content {
            position: relative;
            z-index: 3;
            max-width: 1280px;
            width: 100%;
            text-align: center;
            padding: 0 2rem;
        }

        .logo-container {
            margin-bottom: 2rem;
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        .logo-placeholder {
            width: 128px;
            height: 64px;
            margin: 0 auto;
            background: linear-gradient(135deg, #7c3aed, #a855f7);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: bold;
            color: white;
        }

        h1 {
            font-size: 3.75rem;
            font-weight: 800;
            background: linear-gradient(135deg, #a855f7, #ec4899, #7c3aed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1.5rem;
        }

        .subtitle {
            font-size: 1.125rem;
            color: #4b5563;
            margin-bottom: 3rem;
            line-height: 1.75;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }

        h2 {
            font-size: 2.25rem;
            font-weight: 700;
            background: linear-gradient(135deg, #a855f7, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 2rem;
        }

        .button-container {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 2rem;
        }

        .btn {
            padding: 1rem 2.5rem;
            font-size: 1.125rem;
            font-weight: 700;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #7c3aed, #a855f7);
            color: white;
            box-shadow: 0 10px 30px rgba(124, 58, 237, 0.3);
        }

        /* ✅ Hover keeps SAME color */
        .btn:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 15px 40px rgba(124, 58, 237, 0.4);
            background: linear-gradient(135deg, #7c3aed, #a855f7);
        }

        .btn::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), transparent);
            opacity: 0;
            transition: opacity 0.3s;
        }

        .btn:hover::before {
            opacity: 1;
        }

        /* Content Section */
        .content-section {
            position: relative;
            padding: 6rem 1rem;
            background: #ffffff;
            z-index: 3;
        }

        .container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        @media (max-width: 768px) {
            h1 { font-size: 2.5rem; }
            h2 { font-size: 1.75rem; }
            .button-container { flex-direction: column; width: 100%; }
            .btn { width: 100%; }
        }
    </style>
</head>

<body>
    <canvas id="matrixCanvas"></canvas>

    <div class="hero-section">
        <div class="gradient-bg"></div>

        <div class="hero-content">
            <div class="logo-container">
                <div class="logo-placeholder">LOGO</div>
            </div>

            <h1>hodlCoin Staking Platform</h1>

            <p class="subtitle">
                Self-Stabilizing Staking vaults where the price is mathematically proven to always increase!
            </p>

            <h2>Choose the blockchain where you would like to stake:</h2>

            <div class="button-container">
                <button class="btn">EVM Chains</button>
                <button class="btn">Ergo</button>
                <button class="btn">Alephium</button>
            </div>
        </div>
    </div>

    <script>
        const canvas = document.getElementById('matrixCanvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = '01';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#c084fc';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 50);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    </script>
</body>
</html>
