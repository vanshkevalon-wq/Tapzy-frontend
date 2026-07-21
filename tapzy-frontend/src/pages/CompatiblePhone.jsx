import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const phoneData = {
  Apple: {
    link: '/guide/iphone-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on iOS Devices (Apple)',
    models: [
      'iPhone 7', 'iPhone 7 Plus', 'iPhone 8', 'iPhone 8 Plus', 'iPhone X',
      'iPhone XS', 'iPhone XS Max', 'iPhone XR', 'iPhone SE (2020)',
      'iPhone 11', 'iPhone 11 Pro', 'iPhone 12', 'iPhone 12 Mini',
      'iPhone 12 Pro', 'iPhone 12 Pro Max', 'iPhone 13', 'iPhone 13 Mini',
      'iPhone 13 Pro', 'iPhone 13 Pro Max', 'iPhone 14', 'iPhone 14 Plus',
      'iPhone 14 Pro', 'iPhone 14 Pro Max', 'iPhone 15', 'iPhone 15 Plus',
      'iPhone 15 Pro', 'iPhone 15 Pro Max'
    ]
  },
  Samsung: {
    link: '/guide/samsung-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on Samsung Devices (Android)',
    models: [
      'Samsung Galaxy SIII', 'Samsung Galaxy S4', 'Samsung Galaxy S5',
      'Samsung Galaxy S6', 'Samsung Galaxy S6 Edge', 'Samsung Galaxy S6 Edge+',
      'Samsung Galaxy S7', 'Samsung Galaxy S7 Edge', 'Samsung Galaxy S8',
      'Samsung Galaxy S8+', 'Samsung Galaxy S9', 'Samsung Galaxy S9+',
      'Samsung Galaxy S9 Plus', 'Samsung Galaxy S10', 'Samsung Galaxy S10 Plus',
      'Samsung Galaxy S21 Plus', 'Samsung Galaxy S20 Plus', 'Samsung Galaxy S20 Ultra',
      'Samsung Galaxy S21 Ultra', 'Samsung Galaxy S20 FE', 'Samsung Galaxy Note 3',
      'Samsung Galaxy Note 3 NEO', 'Samsung Note 5', 'Samsung Galaxy Note 5',
      'Samsung Galaxy Note 10 Lite', 'Samsung Galaxy Note 10 Plus',
      'Samsung Galaxy Alpha', 'Samsung Galaxy A32', 'Samsung Galaxy A30s',
      'Samsung Galaxy A5', 'Samsung Galaxy A50s', 'Samsung Galaxy A51',
      'Samsung Galaxy A52s', 'Samsung Galaxy A52', 'Samsung Galaxy A70',
      'Samsung Galaxy A70s', 'Samsung Galaxy A72', 'Samsung Galaxy A80',
      'Samsung Galaxy M32', 'Samsung Galaxy M40', 'Samsung Galaxy M42',
      'Samsung Galaxy M51', 'Samsung Galaxy F62', 'Samsung Galaxy On8',
      'Samsung Galaxy S3 Neo', 'Samsung Galaxy Z Flip 3', 'Samsung Galaxy Z Fold 3',
      'Samsung Galaxy S22+', 'Samsung Galaxy Z Fold 4', 'Samsung Galaxy S23',
      'Samsung Galaxy S23+', 'Samsung Galaxy S23 Ultra', 'Samsung Galaxy M14',
      'Samsung Galaxy F54', 'Samsung Galaxy M34 5G', 'Samsung Galaxy Z Flip5',
      'Samsung Galaxy Z Fold5', 'Samsung Galaxy F34', 'Samsung Galaxy S23 FE',
      'Samsung Galaxy S24', 'Samsung Galaxy S24+', 'Samsung Galaxy S24 Ultra'
    ]
  },
  'One Plus': {
    link: '/guide/oneplus-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on OnePlus Devices',
    models: [
      'OnePlus 3', 'OnePlus 3T', 'OnePlus 5', 'OnePlus 5T', 'OnePlus 6',
      'OnePlus 7', 'OnePlus 7T', 'OnePlus 7 Pro', '7T Pro McLaren Edition',
      'OnePlus 8 Pro', 'OnePlus 8', 'OnePlus Nord', 'OnePlus 8T', 'OnePlus 6T',
      'OnePlus 9', 'OnePlus 9 Pro', 'OnePlus 9 R', 'OnePlus 10T 5G',
      'OnePlus 10R 5G', 'OnePlus 10R Pro 5G', 'OnePlus 9RT 5G',
      'OnePlus Nord CE 5G', 'OnePlus Nord 2 5G', 'OnePlus Nord CE 2 5G',
      'OnePlus Nord 2T 5G', 'OnePlus Open', 'OnePlus Ace Racing',
      'OnePlus Ace Pro', 'OnePlus Nord N300', 'OnePlus 11', 'OnePlus Ace 2',
      'OnePlus 11R', 'OnePlus Ace 2V', 'OnePlus Nord N30', 'OnePlus Nord 3',
      'OnePlus Nord CE3', 'OnePlus Ace 2 Pro', 'OnePlus Ace 3', 'OnePlus 12',
      'OnePlus 12R', 'OnePlus Nord N30 SE'
    ]
  },
  Nokia: {
    link: '/guide/nokia-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on Nokia Devices',
    models: [
      'Nokia 3', 'Nokia 3.1', 'Nokia 4.2', 'Nokia 5', 'Nokia 5.1',
      'Nokia 6', 'Nokia 6.1', 'Nokia 7', 'Nokia 7 Plus', 'Nokia 8 Sirocco',
      'Nokia 8', 'Nokia 8.1', 'Nokia 9', 'Nokia Lumia 920', 'Nokia Lumia 930',
      'Nokia XR20', 'Nokia G300', 'Nokia X100', 'Nokia G400', 'Nokia X30'
    ]
  },
  Nothing: {
    link: '/guide/nothing-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on Nothing Devices',
    models: ['Nothing Phone 1', 'Nothing Phone 2']
  },
  Motorola: {
    link: '/guide/motorola-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on Motorola Devices',
    models: [
      'Motorola One', 'Motorola One Vision', 'Motorola One Action',
      'Motorola One Vision Plus', 'Moto Z3 Play', 'Moto E4 Plus', 'Moto X4',
      'Moto E5/Plus', 'Moto E5 Play/Go', 'Moto G5/G5S Plus', 'Moto G6/Plus/Play',
      'Motorola Razr', 'Motorola Moto Turbo', 'Motorola Moto X Force',
      'Motorola Moto X Play', 'Motorola Edge S', 'Motorola Edge 20',
      'Motorola Edge 20 Fusion', 'Motorola Edge S Pro', 'Motorola Edge 20 Pro',
      'Motorola Edge 20 Lite', 'Motorola Edge Plus', 'Motorola Edge',
      'Motorola Defy', 'Motorola Moto X'
    ]
  },
  LG: {
    link: '/guide/lg-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on LG Devices',
    models: [
      'LG G3', 'LG G4', 'LG G5', 'LG Nexus 5X', 'LG V10', 'LG V20', 'LG V30',
      'LG V30 ThinQ', 'LG V35 ThinQ', 'LG V40 ThinQ', 'LG G6', 'LG Q6',
      'LG Q6 Plus', 'LG Q Styus', 'LG Q Stylus 4', 'LG Q7', 'LG G7 ThinQ',
      'LG Q8', 'LG G8 ThinQ', 'LG Q92', 'LG K10', 'LG K62', 'LG K92',
      'LG Wing', 'LG G7 Plus ThinQ', 'LG G4 Dual', 'LG G2', 'LG Stylus 2 Plus',
      'LG F70', 'LG G Pro 2', 'LG Q7 Plus'
    ]
  },
  Xiaomi: {
    link: '/guide/xiaomi-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on Xiaomi Devices',
    models: [
      'Xiaomi Mi 11X', 'Xiaomi Mi 11 Lite', 'Xiaomi Mi 10T Pro', 'Xiaomi Mi 10',
      'Xiaomi Mi 10T', 'Xiaomi Mi 11X Lite', 'Xiaomi Mi3', 'Xiaomi Redmi Note 10 Pro',
      'Xiaomi Redmi K40', 'Xiaomi Mi Mix 4', 'Xiaomi Mi 11T Pro', 'Xiaomi Mi 11 Pro',
      'Xiaomi Redmi Note 9 Pro', 'Xiaomi Redmi K40 Pro', 'Xiaomi Mi 11 Ultra',
      'Xiaomi Mi 11 Lite NE', 'Xiaomi Mi 11', 'Xiaomi Mi5', 'Xiaomi Mi 10T Lite',
      'Xiaomi Redmi K30s', 'Xiaomi Mi 11i', 'Xiaomi Redmi Note 9T', 'Xiaomi Mi 10 Lite',
      'Xiaomi Redmi K40 Pro Plus', 'Xiaomi Mi 10S', 'Xiaomi Mi Mix Fold',
      'Xiaomi Redmi K30 Ultra', 'Xiaomi Mi 10 Ultra', 'Xiaomi Mi 11 T'
    ]
  },
  Google: {
    link: '/guide/google-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on Google Pixel Devices',
    models: [
      'Google Pixel', 'Google Pixel XL', 'Google Pixel 2', 'Google Pixel 2XL',
      'Google Pixel 3XL', 'Google Pixel 3', 'Google Pixel 3A', 'Google Nexus 4',
      'Google Pixel 4A', 'Google LG Nexus 5', 'Google Nexus 5X', 'Google Nexus 6P',
      'Google Pixel 6a', 'Google Pixel 6', 'Google Pixel Pro', 'Google Pixel 7',
      'Google Pixel 7a', 'Google Pixel 7 Pro', 'Google Pixel 8', 'Google Pixel 8 pro'
    ]
  },
  Realme: {
    link: '/guide/realme-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on Realme Devices',
    models: [
      'Realme GT', 'Realme Narzo 30', 'Realme X7 Max', 'Realme X7 Pro',
      'Realme X50 Pro', 'Realme X2 Pro', 'Realme GT Neo'
    ]
  },
  Sony: {
    link: '/guide/sony-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on Sony Devices',
    models: [
      'XA1/Ultra/Plus', 'XA2/Ultra/Plus', 'XZ1/Compact', 'XZ2/Compact/Premium',
      'Sony Xperia 10', 'Sony Xperia 10 Lite', 'Sony Xperia 8 Lite',
      'Sony Xperia XA1', 'Sony Xperia Z1', 'Sony Xperia C5', 'Sony Xperia XZ1',
      'Sony Xperia XA1 Dual', 'Sony Xperia XA1 Ultra', 'Sony Xperia XZ',
      'Sony Xperia T3', 'Sony Xperia XA', 'Sony Xperia ZR', 'Sony Xperia Z3+',
      'Sony Xperia SP', 'Sony Xperia XA1 Plus', 'Sony Xperia Z2', 'Sony Xperia Z5',
      'Sony Xperia T2', 'Sony Xperia E3', 'Sony Xperia Z3', 'Sony Xperia L2',
      'Sony Xperia M2'
    ]
  },
  Vivo: {
    link: '/guide/vivo-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on Vivo Devices',
    models: [
      'Vivo X70 Pro Plus', 'Vivo X70 Pro', 'Vivo X70', 'Vivo Z6', 'Vivo S10 Pro',
      'Vivo Nex 3S', 'Vivo S9 5G', 'Vivo X60T Pro Plus', 'Vivo X60T', 'Vivo Y53s'
    ]
  },
  Honor: {
    link: '/guide/honor-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on Honor Devices',
    models: ['Honor 8', 'Honor View 20', 'Honor V10', 'Honor 8 Pro']
  },
  HTC: {
    link: '/guide/htc-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on HTC Devices',
    models: [
      'HTC One A9', 'HTC Desire 20 Plus', 'HTC U Ultra', 'HTC 10 Evo',
      'HTC U11 Plus', 'HTC Desire 10 Pro', 'HTC One E8', 'HTC Desire Eye',
      'HTC 10 Lifestyle', 'HTC One ME', 'HTC One E9+', 'HTC One M9 Plus'
    ]
  },
  Poco: {
    link: '/guide/poco-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on Poco Devices',
    models: ['Poco F2 Pro', 'Poco F3', 'Poco X3 GT']
  },
  OPPO: {
    link: '/guide/oppo-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on OPPO Devices',
    models: [
      'OPPO Reno6', 'OPPO Reno6 Pro', 'OPPO Reno 4', 'OPPO Reno 2',
      'OPPO Find X2', 'OPPO R17 Pro', 'OPPO Reno 3', 'OPPO Find X3 Pro',
      'OPPO Reno 6 Pro Plus', 'OPPO K9', 'OPPO A95', 'OPPO Find X3',
      'OPPO K9 Pro', 'OPPO Reno 5 Pro', 'OPPO Reno 10x', 'OPPO N1',
      'OPPO Reno 5A', 'OPPO Reno', 'OPPO Reno6 4G', 'OPPO A16s', 'OPPO A94',
      'OPPO Find X3 Neo', 'OPPO Reno 5 Lite', 'OPPO Reno 3A', 'OPPO N1 Mini'
    ]
  },
  Asus: {
    link: '/guide/asus-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on Asus Devices',
    models: [
      'Asus ROG Phone', 'Zenfone 10', 'ROG Phone 7 Ultimate', 'ROG Phone 7',
      'ROG Phone 6 Diablo Immortal Edition', 'ROG Phone 6 BATMAN Edition',
      'ROG Phone 6D', 'ROG Phone 6D Ultimate', 'ROG Phone 6', 'Zenfone 9',
      'Zenfone 8 Flip', 'Zenfone 8', 'ROG Phone 5 Ultimate', 'ROG Phone 5s Pro',
      'ROG Phone 5s', 'ROG Phone 5 Pro', 'ROG Phone 5', 'ROG Phone 8',
      'ROG Phone 8 Pro'
    ]
  },
  Essential: {
    link: '/guide/essential-nfc-guide',
    linkText: 'How to Use Tapzy NFC Business Card on Essential Devices',
    models: ['Essential PH-1']
  }
}

export default function CompatiblePhone() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = Object.entries(phoneData).reduce((acc, [brand, data]) => {
    const filteredModels = data.models.filter(model =>
      model.toLowerCase().includes(searchTerm.toLowerCase())
    )
    if (filteredModels.length > 0) {
      acc[brand] = { ...data, models: filteredModels }
    }
    return acc
  }, {})

  return (
    <main className="bg-offwhite min-h-screen">
      {/* Hero Section */}
      <section className="bg-plum text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
              Is your device Tapzy compatible?
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              Tapzy uses technology that is compatible with most newer iPhone and Android devices. 
              Check the list below to see if your device is NFC compatible. If not, QR code is accepted by most smartphones.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h2 className="text-2xl font-bold text-plum mb-4 text-center">Search Your Device</h2>
            <div className="relative">
              <span className="icon absolute left-4 top-1/2 -translate-y-1/2 text-plum/40 text-xl">search</span>
              <input
                type="text"
                placeholder="Enter device name to search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-primary-100 rounded-xl focus:outline-none focus:border-primary-400 transition-colors text-plum"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Device List Section */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {Object.keys(filteredData).length === 0 ? (
            <div className="bg-white rounded-2xl shadow-card p-12 text-center">
              <span className="icon text-6xl text-primary-200 mb-4 block">search_off</span>
              <p className="text-plum/60 text-lg">No devices found matching "{searchTerm}"</p>
            </div>
          ) : (
            Object.entries(filteredData).map(([brand, data]) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-card p-8"
              >
                <h2 className="text-3xl font-extrabold text-plum mb-4">{brand}</h2>
                <Link
                  to={data.link}
                  className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium mb-6 group"
                >
                  <span className="underline">{data.linkText}</span>
                  <span className="icon text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {data.models.map((model) => (
                    <div
                      key={model}
                      className="px-4 py-3 bg-offwhite rounded-lg text-plum/80 text-sm hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      {model}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
