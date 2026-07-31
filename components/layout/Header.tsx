return (

<header className="header">

    <div className="header-top">

        <div className="brand">

            <h1>MEGAL ROCHA</h1>

            <p>RESULTADOS OFICIALES DEL URUGUAY</p>

        </div>

        <div className="header-status">

            <div className="status-box">

                <span>🕘</span>

                <strong>{hora}</strong>

            </div>

            <div className="status-box">

                <span>📅</span>

                <strong>{fecha}</strong>

            </div>

            <div className="status-box">

                <span>🌤</span>

                <strong>14°C</strong>

            </div>

            <div className="status-box online">

                ● ONLINE

            </div>

        </div>

    </div>

    <div className="header-bottom">

        <NextDraw />

        <LastUpdate />

        <SystemStatus />

    </div>

</header>

)
