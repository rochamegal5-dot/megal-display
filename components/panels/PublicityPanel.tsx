'use client'

const anuncios = [
  { title: 'Megal Rocha', text: 'Delivery rápido en toda Rocha' },
  { title: 'Promociones', text: 'Comprá y ganá descuentos exclusivos' },
  { title: 'Pedidos', text: '091 434 630 - WhatsApp disponible' },
  { title: 'Garrafa', text: 'Recarga de garrafa con envío gratis' },
]

export default function PublicityPanel() {
  return (
    <div className="panel panel-publicidad">
      <div className="panel-title">📣 Publicidad Comercial</div>
      <div className="panel-body publicity-list">
        {anuncios.map((item) => (
          <div key={item.title} className="publicity-item">
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
