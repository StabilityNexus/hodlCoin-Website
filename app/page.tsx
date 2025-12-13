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
        }

        h1 {
            font-size: 3.75rem;
            font-weight: 800;
            background: linear-gradient(135deg, #a855f7, #ec4899, #7c3aed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1.5rem;
            animation: fadeIn 1s ease-in;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
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
            background-clip: text;
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

        .btn:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
            background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
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

        .how-it-works {
            display: flex;
            gap: 3rem;
            align-items: center;
            margin-bottom: 6rem;
        }

        .paper-card {
            flex: 1;
            background: rgba(243, 244, 246, 0.5);
            border: 1px solid rgba(124, 58, 237, 0.2);
            border-radius: 1rem;
            padding: 1rem;
            transition: all 0.3s;
        }

        .paper-card:hover {
            border-color: rgba(124, 58, 237, 0.4);
            transform: translateY(-5px);
        }

        .paper-image {
            width: 100%;
            aspect-ratio: 1;
            background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #9ca3af;
            font-size: 3rem;
        }

        .content-text {
            flex: 1;
        }

        .section-title {
            font-size: 2.25rem;
            font-weight: 800;
            background: linear-gradient(135deg, #a855f7, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
        }

        .divider {
            width: 80px;
            height: 4px;
            background: linear-gradient(90deg, #7c3aed, #a855f7);
            border-radius: 2px;
            margin-bottom: 1.5rem;
        }

        .description {
            font-size: 1.125rem;
            line-height: 1.75;
            color: #4b5563;
            margin-bottom: 1rem;
        }

        .read-more {
            display: inline-flex;
            align-items: center;
            color: #a855f7;
            font-weight: 600;
            text-decoration: none;
            margin-top: 1rem;
            transition: color 0.3s;
        }

        .read-more:hover {
            color: #c084fc;
        }

        .why-section {
            text-align: center;
            margin-bottom: 4rem;
        }

        .cards-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
        }

        .feature-card {
            background: rgba(243, 244, 246, 0.5);
            border: 1px solid rgba(124, 58, 237, 0.2);
            border-radius: 1rem;
            padding: 2rem;
            transition: all 0.3s;
        }

        .feature-card:hover {
            border-color: rgba(124, 58, 237, 0.4);
            transform: translateY(-5px);
        }

        .card-title {
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, #a855f7, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.5rem;
        }

        .card-divider {
            width: 48px;
            height: 2px;
            background: linear-gradient(90deg, #7c3aed, #a855f7);
            border-radius: 2px;
            margin-bottom: 1.5rem;
        }

        .feature-list {
            list-style: none;
        }

        .feature-item {
            display: flex;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
        }

        .bullet {
            width: 8px;
            height: 8px;
            background: #7c3aed;
            border-radius: 50%;
            margin-top: 8px;
            flex-shrink: 0;
        }

        .feature-content h4 {
            font-weight: 600;
            background: linear-gradient(135deg, #a855f7, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.25rem;
        }

        .feature-content p {
            font-size: 0.875rem;
            color: #4b5563;
            line-height: 1.5;
        }

        @media (max-width: 768px) {
            h1 { font-size: 2.5rem; }
            h2 { font-size: 1.75rem; }
            .how-it-works { flex-direction: column; }
            .cards-grid { grid-template-columns: 1fr; }
            .button-container { flex-direction: column; width: 100%; }
            .btn { width: 100%; }
        }
    </style>
</head>
<body>
    <canvas id="matrixCanvas"></canvas>

    <!-- Hero Section -->
    <div class="hero-section">
        <div class="gradient-bg"></div>
        <div class="glow-effects">
            <div class="glow glow-1"></div>
            <div class="glow glow-2"></div>
            <div class="glow glow-3"></div>
        </div>
        
        <div class="hero-content">
            <div class="logo-container">
                <div class="logo-placeholder">LOGO</div>
            </div>
            
            <h1>hodlCoin Staking Platform</h1>
            
            <p class="subtitle">
                Self-Stabilizing Staking vaults where the price is mathematically proven to always increase!<br>
                Unstaking fees benefit vault creators and those who keep staking longer.
            </p>
            
            <h2>Choose the blockchain where you would like to stake:</h2>
            
            <div class="button-container">
                <button class="btn">EVM Chains</button>
                <button class="btn">Ergo</button>
                <button class="btn">Alephium</button>
            </div>
        </div>
    </div>

    <!-- Content Section -->
    <div class="content-section">
        <div class="container">
            <!-- How It Works -->
            <div class="how-it-works">
                <div class="paper-card">
                    <div class="paper-image">📄</div>
                </div>
                
                <div class="content-text">
                    <div class="section-title">How hodlCoin Works</div>
                    <div class="divider"></div>
                    
                    <p class="description">
                        HodlCoin is a staking protocol that encourages staking ("hodling") assets for long periods of time. When hodling, users deposit coins of a given asset in a vault and receive a proportional amount of corresponding hodlCoins.
                    </p>
                    
                    <p class="description">
                        When unhodling, users must pay an unstaking fee that benefits the vault's creator and users who continue hodling longer. Moreover, anyone (especially vault creators) can distribute rewards to hodlers, to further incentivize hodling.
                    </p>
                    
                    <a href="#" class="read-more">
                        Read the Research Paper →
                    </a>
                </div>
            </div>
            
            <!-- Why Section -->
            <div class="why-section">
                <div class="section-title">Why hodlCoin</div>
            </div>
            
            <div class="cards-grid">
                <!-- Vault Creators Card -->
                <div class="feature-card">
                    <div class="card-title">For Vault Creators</div>
                    <div class="card-divider"></div>
                    
                    <ul class="feature-list">
                        <li class="feature-item">
                            <div class="bullet"></div>
                            <div class="feature-content">
                                <h4>Reward your Loyal Tokenholders</h4>
                                <p>Efficiently distribute rewards to all your tokenholders with a single transaction.</p>
                            </div>
                        </li>
                        <li class="feature-item">
                            <div class="bullet"></div>
                            <div class="feature-content">
                                <h4>Signal your Long-Term Commitment</h4>
                                <p>Stake your own tokens in a vault with a high unstaking fee, to show your community that you are holding for the long run.</p>
                            </div>
                        </li>
                        <li class="feature-item">
                            <div class="bullet"></div>
                            <div class="feature-content">
                                <h4>Earn Unstaking Fees</h4>
                                <p>Receive a portion of fees when users unstake early.</p>
                            </div>
                        </li>
                        <li class="feature-item">
                            <div class="bullet"></div>
                            <div class="feature-content">
                                <h4>Protect your Token from Sell Pressure</h4>
                                <p>The unstaking fee disincentivizes sellers and incentivizes holders without inflation.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                
                <!-- Stakers Card -->
                <div class="feature-card">
                    <div class="card-title">For Stakers</div>
                    <div class="card-divider"></div>
                    
                    <ul class="feature-list">
                        <li class="feature-item">
                            <div class="bullet"></div>
                            <div class="feature-content">
                                <h4>Earn from Others' Impatience</h4>
                                <p>Benefit from unstaking fees paid by users who exit early.</p>
                            </div>
                        </li>
                        <li class="feature-item">
                            <div class="bullet"></div>
                            <div class="feature-content">
                                <h4>Long-Term Value Growth</h4>
                                <p>The price of the hodlCoin is mathematically guaranteed to grow w.r.t. the price of the underlying coin, if you hodl longer than others.</p>
                            </div>
                        </li>
                        <li class="feature-item">
                            <div class="bullet"></div>
                            <div class="feature-content">
                                <h4>Receive Rewards</h4>
                                <p>Get additional rewards distributed by vault creators who want to incentivize staking.</p>
                            </div>
                        </li>
                        <li class="feature-item">
                            <div class="bullet"></div>
                            <div class="feature-content">
                                <h4>Flexible Participation</h4>
                                <p>Stake and unstake at any time, choosing from a wide variety of vaults for various tokens.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Matrix Effect
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