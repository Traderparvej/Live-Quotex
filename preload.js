window.addEventListener('DOMContentLoaded', () => {
    // Overlay panel
    const panel = document.createElement('div');
    panel.id = 'candlestick-panel';
    panel.style.position = 'fixed';
    panel.style.bottom = '20px';
    panel.style.left = '20px';
    panel.style.backgroundColor = 'rgba(0,0,0,0.7)';
    panel.style.color = 'white';
    panel.style.padding = '12px 16px';
    panel.style.borderRadius = '8px';
    panel.style.fontFamily = 'Arial, sans-serif';
    panel.style.fontSize = '16px';
    panel.style.lineHeight = '1.5';
    panel.style.zIndex = '9999';
    panel.style.pointerEvents = 'none';
    panel.innerText = 'Candlestick: N/A\nTrend: N/A';
    document.body.appendChild(panel);

    // Canvas analysis function (demo pixel-based)
    function analyzeCanvas(canvas) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Capture vertical slice of last candle
        const sampleX = width - 10; 
        const imageData = ctx.getImageData(sampleX, 0, 1, height).data;

        let green = 0, red = 0;
        for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];

            if (g > r && g > b) green++;
            if (r > g && r > b) red++;
        }

        // Trend detection
        let trend = 'Sideways';
        if (green > red * 1.2) trend = 'Up';
        if (red > green * 1.2) trend = 'Down';

        // Simple candlestick naming
        let pattern = 'Doji';
        if (green > red) pattern = 'Bullish';
        if (red > green) pattern = 'Bearish';

        return { pattern, trend };
    }

    // Interval to update overlay
    setInterval(() => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return;

        const { pattern, trend } = analyzeCanvas(canvas);
        panel.innerText = `Candlestick: ${pattern}\nTrend: ${trend}`;
    }, 1000);
});

