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

        #matrixCanvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            opacity: 0.15;
        }

        .hero-section {
            position: relative;
            min-height: 90vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4rem 1rem;
        }

        .hero-content {
            position: relative;
            z-index: 3;
            max-width: 1280px;
            width: 100%;
            text-align: center;
            padding: 0 2rem;
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
        }

        .btn {
            padding: 1rem 2.5rem;
            font-size: 1.125rem;
            font-weight: 700;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            background: linear-gradient(135deg, #7c3aed, #a855f7);
            color: white;
            box-shadow: 0 10px 30px rgba(124, 58, 237, 0.3);
        }

        /* ✅ SAME color on hover */
        .btn:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 15px 40px rgba(124, 58, 237, 0.4);
            background: linear-gradient(135deg, #7c3aed, #a855f7);
        }

        @media (max-width: 768px) {
            h1 { font-size: 2.5rem; }
            h2 { font-size: 1.75rem; }
            .button-container { flex-direction: column; }
            .btn { width: 100%; }
        }
    </style>
</head>

<body>
    <canvas id="matrixCanvas"></canvas>

    <div class="hero-section">
        <div class="hero-content">
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
        let columns = canvas.width / fontSize;
        let drops = Array(Math.floor(columns)).fill(1);

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
            columns = canvas.width / fontSize;
            drops = Array(Math.floor(columns)).fill(1);
        });
    </script>
</body>
</html>
