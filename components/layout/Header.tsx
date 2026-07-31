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
    .header{

    width:100%;

    background:linear-gradient(180deg,#101010,#1d1d1d);

    border-bottom:3px solid gold;

    padding:18px 30px;

    box-shadow:0 5px 20px rgba(0,0,0,.5);

}

.header-top{

    display:flex;

    justify-content:space-between;

    align-items:center;

}

.brand h1{

    font-size:42px;

    color:#FFD700;

    margin:0;

    letter-spacing:2px;

    text-shadow:0 0 18px rgba(255,215,0,.7);

}

.brand p{

    color:white;

    font-size:18px;

    margin-top:6px;

    opacity:.85;

}

.header-status{

    display:flex;

    gap:14px;

}

.status-box{

    background:#202020;

    border:1px solid #444;

    border-radius:12px;

    padding:14px 20px;

    min-width:130px;

    text-align:center;

}

.status-box strong{

    display:block;

    font-size:24px;

    color:white;

}

.status-box span{

    color:#FFD700;

    font-size:14px;

}

.online{

    color:#00ff7f;

    font-weight:bold;

}

.header-bottom{

    display:flex;

    justify-content:center;

    gap:25px;

    margin-top:18px;

}

</header>

)
