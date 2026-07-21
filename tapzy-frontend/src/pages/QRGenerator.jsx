import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QRCodeStyling from 'qr-code-styling'

// ─── Preset swatches (hex + Tailwind bg class) ─────────────────────────────
const FG_PRESETS = [
  { hex: '#000000', tw: 'bg-black'        },
  { hex: '#1a0a2e', tw: 'bg-[#1a0a2e]'   },
  { hex: '#A64BDF', tw: 'bg-[#A64BDF]'   },
  { hex: '#6d28d9', tw: 'bg-[#6d28d9]'   },
  { hex: '#dc2626', tw: 'bg-[#dc2626]'   },
  { hex: '#0284c7', tw: 'bg-[#0284c7]'   },
  { hex: '#059669', tw: 'bg-[#059669]'   },
  { hex: '#d97706', tw: 'bg-[#d97706]'   },
  { hex: '#db2777', tw: 'bg-[#db2777]'   },
]

const BG_PRESETS = [
  { hex: '#ffffff', tw: 'bg-white'        },
  { hex: '#f5f3ff', tw: 'bg-[#f5f3ff]'   },
  { hex: '#fef3c7', tw: 'bg-[#fef3c7]'   },
  { hex: '#ecfdf5', tw: 'bg-[#ecfdf5]'   },
  { hex: '#eff6ff', tw: 'bg-[#eff6ff]'   },
  { hex: '#fdf2f8', tw: 'bg-[#fdf2f8]'   },
  { hex: '#1a0a2e', tw: 'bg-[#1a0a2e]'   },
  { hex: '#0f172a', tw: 'bg-[#0f172a]'   },
]

const DOT_STYLES   = ['square','dots','rounded','extra-rounded','classy','classy-rounded']
const EYE_STYLES   = ['square','dot','extra-rounded']
const CORNER_STYLES = ['square','dot','extra-rounded']

function isValidUrl(str) {
  try {
    const u = new URL(str.startsWith('http') ? str : `https://${str}`)
    return u.hostname.includes('.')
  } catch { return false }
}
function normaliseUrl(raw) {
  const t = raw.trim()
  if (!t) return ''
  if (/^https?:\/\//i.test(t)) return t
  return `https://${t}`
}

export default function QRGenerator() {
  const [tab, setTab]             = useState('url')
  const [url, setUrl]             = useState('')
  const [text, setText]           = useState('')
  const [error, setError]         = useState('')
  // Colours
  const [dotsLeft,   setDotsLeft]   = useState('#000000')
  const [dotsRight,  setDotsRight]  = useState('#000000')
  const [bgLeft,     setBgLeft]     = useState('#ffffff')
  const [bgRight,    setBgRight]    = useState('#ffffff')
  const [eyeFrame,   setEyeFrame]   = useState('#000000')
  const [eyeColor,   setEyeColor]   = useState('#000000')
  // Styles
  const [dotStyle,    setDotStyle]    = useState('square')
  const [eyeDotStyle, setEyeDotStyle] = useState('square')
  const [cornerStyle, setCornerStyle] = useState('square')
  // Logo
  const [logoFile,   setLogoFile]   = useState(null)
  const [logoUrl,    setLogoUrl]    = useState('')
  const [logoSize,   setLogoSize]   = useState(20)
  const [logoMargin, setLogoMargin] = useState(5)
  // Settings
  const [errLevel,  setErrLevel]  = useState('M')
  const [padding,   setPadding]   = useState(5)
  const [qrSize,    setQrSize]    = useState(300)
  const [copied,    setCopied]    = useState(false)
  // Download options
  const [dlFormat,  setDlFormat]  = useState('png')
  const [dlSize,    setDlSize]    = useState(512)

  const containerRef = useRef(null)
  const qrRef        = useRef(null)
  const inputRef     = useRef(null)

  const content = tab === 'url' ? normaliseUrl(url) : text.trim()

  // Build / rebuild the QRCodeStyling instance whenever options change
  const buildQR = useCallback(() => {
    if (!content) { if (containerRef.current) containerRef.current.innerHTML = ''; return }
    if (tab === 'url' && !isValidUrl(url.trim())) {
      setError('Please enter a valid URL (e.g. https://yoursite.com)')
      return
    }
    setError('')

    const opts = {
      width:  qrSize,
      height: qrSize,
      data:   content,
      margin: padding,
      qrOptions:       { errorCorrectionLevel: errLevel },
      dotsOptions:     { type: dotStyle,    gradient: { type: 'linear', rotation: 0, colorStops: [{ offset: 0, color: dotsLeft }, { offset: 1, color: dotsRight }] } },
      backgroundOptions: { gradient: { type: 'linear', rotation: 0, colorStops: [{ offset: 0, color: bgLeft }, { offset: 1, color: bgRight }] } },
      cornersSquareOptions: { type: cornerStyle, color: eyeFrame },
      cornersDotOptions:    { type: eyeDotStyle, color: eyeColor },
    }
    if (logoUrl) {
      opts.image = logoUrl
      opts.imageOptions = { crossOrigin: 'anonymous', margin: logoMargin, imageSize: logoSize / 100 }
    }

    if (qrRef.current) {
      qrRef.current.update(opts)
    } else {
      qrRef.current = new QRCodeStyling(opts)
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
        qrRef.current.append(containerRef.current)
      }
    }
  }, [content, tab, url, qrSize, padding, errLevel, dotStyle, eyeDotStyle, cornerStyle,
      dotsLeft, dotsRight, bgLeft, bgRight, eyeFrame, eyeColor, logoUrl, logoSize, logoMargin])

  useEffect(() => {
    const t = setTimeout(buildQR, 350)
    return () => clearTimeout(t)
  }, [buildQR])

  // When container mounts, append QR if content already exists
  const setContainer = useCallback((node) => {
    containerRef.current = node
    if (node && qrRef.current) { node.innerHTML = ''; qrRef.current.append(node) }
  }, [])

  function handleLogoChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setLogoFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setLogoUrl(ev.target.result)
    reader.readAsDataURL(file)
  }

  function removeLogo() { setLogoFile(null); setLogoUrl('') }

  async function handleDownload() {
    if (!qrRef.current) return
    // Re-render at chosen export size then download
    qrRef.current.update({ width: dlSize, height: dlSize })
    await new Promise(r => setTimeout(r, 200))
    await qrRef.current.download({ name: 'tapzy-qr', extension: dlFormat })
    // Restore preview size
    qrRef.current.update({ width: qrSize, height: qrSize })
  }

  async function handleCopy() {
    if (!qrRef.current || !containerRef.current) return
    const canvas = containerRef.current.querySelector('canvas')
    if (!canvas) return
    try {
      canvas.toBlob(async (blob) => {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        setCopied(true); setTimeout(() => setCopied(false), 2000)
      })
    } catch {
      setCopied(true); setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <main className="bg-offwhite min-h-screen">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-brand-gradient py-14 px-4">
        <div className="absolute inset-0 bg-hero-mesh opacity-20 pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-white/10" />
        <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full border border-white/10" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} className="relative max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Free · No sign-up required
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 leading-tight">QR Code Generator</h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto">
            Paste any URL or text, customise every detail, and download your QR code instantly.
          </p>
        </motion.div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">

          {/* ════ LEFT PANEL ════ */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }} className="flex flex-col gap-6">

            {/* ── Input card ── */}
            <div className="bg-white rounded-3xl border border-primary-100 shadow-card p-6">
              <h3 className="font-bold text-plum mb-4 flex items-center gap-2">
                <span className="icon text-primary-500">edit</span>Content
              </h3>
              <div className="flex gap-1 bg-primary-50 p-1 rounded-2xl mb-5">
                {[{id:'url',icon:'link',label:'URL / Link'},{id:'text',icon:'text_fields',label:'Plain Text'}].map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${tab===t.id?'bg-white text-primary-600 shadow-sm':'text-plum/50 hover:text-plum/70'}`}>
                    <span className="icon text-base leading-none">{t.icon}</span>{t.label}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                {tab === 'url' && (
                  <motion.div key="url" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.18}}>
                    <label className="block text-xs font-bold text-plum/50 uppercase tracking-wider mb-2">Enter your URL</label>
                    <div className="relative flex items-center">
                      <span className="icon absolute left-4 text-primary-400 text-xl leading-none pointer-events-none">link</span>
                      <input ref={inputRef} type="url" value={url} onChange={e=>{setUrl(e.target.value);setError('')}}
                        placeholder="https://yourwebsite.com" autoComplete="off" spellCheck={false}
                        className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-primary-100 bg-primary-50/40 text-sm font-medium text-plum placeholder-plum/30 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all" />
                      {url && <button onClick={()=>{setUrl('');setError('')}} className="absolute right-3 text-plum/30 hover:text-plum/60 transition-colors"><span className="icon text-lg leading-none">close</span></button>}
                    </div>
                    {url && !error && isValidUrl(url.trim()) && (
                      <p className="mt-2 text-[11px] text-green-600 font-semibold flex items-center gap-1">
                        <span className="icon text-sm">check_circle</span>Valid URL — will open: {normaliseUrl(url)}
                      </p>
                    )}
                  </motion.div>
                )}
                {tab === 'text' && (
                  <motion.div key="text" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.18}}>
                    <label className="block text-xs font-bold text-plum/50 uppercase tracking-wider mb-2">Enter your text</label>
                    <textarea value={text} onChange={e=>setText(e.target.value)} rows={3}
                      placeholder="Type any text, phone number, email…"
                      className="w-full px-4 py-3.5 rounded-2xl border border-primary-100 bg-primary-50/40 text-sm font-medium text-plum placeholder-plum/30 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white resize-none transition-all" />
                    <p className="mt-1 text-[11px] text-plum/30 text-right">{text.length} chars</p>
                  </motion.div>
                )}
              </AnimatePresence>
              {error && <p className="mt-3 text-xs text-red-500 font-semibold flex items-center gap-1.5"><span className="icon text-sm">error</span>{error}</p>}
            </div>

            {/* ── Colours card ── */}
            <div className="bg-white rounded-3xl border border-primary-100 shadow-card p-6">
              <h3 className="font-bold text-plum mb-5 flex items-center gap-2">
                <span className="icon text-primary-500">palette</span>Colours
              </h3>
              <div className="flex flex-col gap-5">
                {/* Dots gradient row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[{label:'Dots (left)',  val:dotsLeft,  set:setDotsLeft },
                    {label:'Dots (right)', val:dotsRight, set:setDotsRight}].map(c => (
                    <div key={c.label}>
                      <label className="block text-xs font-bold text-plum/50 uppercase tracking-wider mb-2">{c.label}</label>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {FG_PRESETS.map(p => (
                          <button key={p.hex} onClick={()=>c.set(p.hex)} title={p.hex}
                            className={`w-6 h-6 rounded-md border-2 transition-all hover:scale-110 ${p.tw} ${c.val===p.hex?'border-primary-500 scale-110':'border-transparent'}`} />
                        ))}
                      </div>
                      <label className="flex items-center gap-2 bg-primary-50/60 border border-primary-100 rounded-xl px-3 py-2 cursor-pointer">
                        <input type="color" value={c.val} onChange={e=>c.set(e.target.value)}
                          className="w-7 h-7 rounded-lg cursor-pointer border-0 bg-transparent p-0" />
                        <span className="text-xs font-mono font-bold text-plum/60 uppercase">{c.val}</span>
                      </label>
                    </div>
                  ))}
                </div>
                {/* Background gradient row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[{label:'Background (left)',  val:bgLeft,  set:setBgLeft },
                    {label:'Background (right)', val:bgRight, set:setBgRight}].map(c => (
                    <div key={c.label}>
                      <label className="block text-xs font-bold text-plum/50 uppercase tracking-wider mb-2">{c.label}</label>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {BG_PRESETS.map(p => (
                          <button key={p.hex} onClick={()=>c.set(p.hex)} title={p.hex}
                            className={`w-6 h-6 rounded-md border-2 transition-all hover:scale-110 ${p.tw} ${c.val===p.hex?'border-primary-500 scale-110':'border-gray-200'}`} />
                        ))}
                      </div>
                      <label className="flex items-center gap-2 bg-primary-50/60 border border-primary-100 rounded-xl px-3 py-2 cursor-pointer">
                        <input type="color" value={c.val} onChange={e=>c.set(e.target.value)}
                          className="w-7 h-7 rounded-lg cursor-pointer border-0 bg-transparent p-0" />
                        <span className="text-xs font-mono font-bold text-plum/60 uppercase">{c.val}</span>
                      </label>
                    </div>
                  ))}
                </div>
                {/* Eye Frame + Eye colour */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-primary-50">
                  {[{label:'Eye Frame', val:eyeFrame, set:setEyeFrame},
                    {label:'Eye',       val:eyeColor, set:setEyeColor}].map(c => (
                    <div key={c.label}>
                      <label className="block text-xs font-bold text-plum/50 uppercase tracking-wider mb-2">{c.label}</label>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {FG_PRESETS.map(p => (
                          <button key={p.hex} onClick={()=>c.set(p.hex)} title={p.hex}
                            className={`w-6 h-6 rounded-md border-2 transition-all hover:scale-110 ${p.tw} ${c.val===p.hex?'border-primary-500 scale-110':'border-transparent'}`} />
                        ))}
                      </div>
                      <label className="flex items-center gap-2 bg-primary-50/60 border border-primary-100 rounded-xl px-3 py-2 cursor-pointer">
                        <input type="color" value={c.val} onChange={e=>c.set(e.target.value)}
                          className="w-7 h-7 rounded-lg cursor-pointer border-0 bg-transparent p-0" />
                        <span className="text-xs font-mono font-bold text-plum/60 uppercase">{c.val}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Styles card ── */}
            <div className="bg-white rounded-3xl border border-primary-100 shadow-card p-6">
              <h3 className="font-bold text-plum mb-4 flex items-center gap-2">
                <span className="icon text-primary-500">dashboard_customize</span>Styles
              </h3>
              <div className="flex flex-col gap-4">
                {[{label:'Main Dot Style', val:dotStyle,    set:setDotStyle,    opts:DOT_STYLES},
                  {label:'Eye Dot Style',  val:eyeDotStyle, set:setEyeDotStyle, opts:EYE_STYLES},
                  {label:'Corner Style',   val:cornerStyle, set:setCornerStyle, opts:CORNER_STYLES}].map(s => (
                  <div key={s.label}>
                    <label className="block text-xs font-bold text-plum/50 uppercase tracking-wider mb-2">{s.label}</label>
                    <div className="relative">
                      <select value={s.val} onChange={e=>s.set(e.target.value)}
                        className="w-full appearance-none pl-4 pr-10 py-3 rounded-2xl border border-primary-100 bg-primary-50/40 text-sm font-semibold text-plum focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all cursor-pointer">
                        {s.opts.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <span className="icon absolute right-3 top-1/2 -translate-y-1/2 text-plum/40 pointer-events-none text-base">expand_more</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Logo card ── */}
            <div className="bg-white rounded-3xl border border-primary-100 shadow-card p-6">
              <h3 className="font-bold text-plum mb-4 flex items-center gap-2">
                <span className="icon text-primary-500">photo_library</span>Logo
              </h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-plum/50 uppercase tracking-wider mb-2">Upload Logo</label>
                  {!logoFile ? (
                    <label className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border-2 border-dashed border-primary-200 text-primary-600 hover:bg-primary-50 hover:border-primary-400 transition-all cursor-pointer">
                      <span className="icon text-base">add_photo_alternate</span>
                      <span className="text-sm font-semibold">Choose File</span>
                      <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                    </label>
                  ) : (
                    <div className="flex items-center gap-3 bg-primary-50 rounded-2xl p-3 border border-primary-100">
                      <img src={logoUrl} alt="Logo" className="w-12 h-12 rounded-lg object-cover border border-primary-200" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-plum truncate">{logoFile.name}</p>
                        <p className="text-[10px] text-plum/40">{(logoFile.size/1024).toFixed(1)} KB</p>
                      </div>
                      <button onClick={removeLogo} className="text-red-500 hover:text-red-700 transition-colors">
                        <span className="icon text-base">delete</span>
                      </button>
                    </div>
                  )}
                </div>
                {logoUrl && (
                  <>
                    <div>
                      <p className="text-xs font-bold text-plum/50 uppercase tracking-wider mb-2">Logo Size — <span className="text-primary-500">{logoSize}%</span></p>
                      <input type="range" min={10} max={40} step={1} value={logoSize} onChange={e=>setLogoSize(Number(e.target.value))} className="w-full accent-primary-500" />
                      <div className="flex justify-between text-[10px] text-plum/30 mt-0.5"><span>10%</span><span>40%</span></div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-plum/50 uppercase tracking-wider mb-2">Logo Margin — <span className="text-primary-500">{logoMargin}px</span></p>
                      <input type="range" min={0} max={20} step={1} value={logoMargin} onChange={e=>setLogoMargin(Number(e.target.value))} className="w-full accent-primary-500" />
                      <div className="flex justify-between text-[10px] text-plum/30 mt-0.5"><span>0</span><span>20</span></div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ── QR Code Settings card ── */}
            <div className="bg-white rounded-3xl border border-primary-100 shadow-card p-6">
              <h3 className="font-bold text-plum mb-4 flex items-center gap-2">
                <span className="icon text-primary-500">settings</span>QR Code Settings
              </h3>
              <div className="flex flex-col gap-5">
                {/* Error Correction */}
                <div>
                  <label className="block text-xs font-bold text-plum/50 uppercase tracking-wider mb-2">Error Correction</label>
                  <div className="relative">
                    <select value={errLevel} onChange={e => setErrLevel(e.target.value)}
                      className="w-full appearance-none pl-4 pr-10 py-3 rounded-2xl border border-primary-100 bg-primary-50/40 text-sm font-semibold text-plum focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all cursor-pointer">
                      <option value="L">Low (7% correction)</option>
                      <option value="M">Medium (15% correction)</option>
                      <option value="Q">Quartile (25% correction)</option>
                      <option value="H">High (30% correction)</option>
                    </select>
                    <span className="icon absolute right-3 top-1/2 -translate-y-1/2 text-plum/40 pointer-events-none text-base">expand_more</span>
                  </div>
                </div>
                {/* QR Code Padding */}
                <div>
                  <p className="text-xs font-bold text-plum/50 uppercase tracking-wider mb-2">
                    QR Code Padding — <span className="text-primary-500">{padding}px</span>
                  </p>
                  <input type="range" min={0} max={20} step={1} value={padding}
                    onChange={e => setPadding(Number(e.target.value))}
                    className="w-full accent-primary-500" />
                  <div className="flex justify-between text-[10px] text-plum/30 mt-0.5">
                    <span>0</span><span>20</span>
                  </div>
                </div>
                {/* Output Size */}
                <div>
                  <p className="text-xs font-bold text-plum/50 uppercase tracking-wider mb-2">
                    Output Size — <span className="text-primary-500">{qrSize}px</span>
                  </p>
                  <input type="range" min={200} max={1000} step={50} value={qrSize}
                    onChange={e => setQrSize(Number(e.target.value))}
                    className="w-full accent-primary-500" />
                  <div className="flex justify-between text-[10px] text-plum/30 mt-0.5">
                    <span>200</span><span>1000</span>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
          {/* ════ end LEFT PANEL ════ */}

          {/* ════ RIGHT PANEL — Preview + Download ════ */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex flex-col gap-4 lg:sticky lg:top-32">

            {/* Preview card */}
            <div className="bg-white rounded-3xl border border-primary-100 shadow-card p-6">
              <h3 className="font-bold text-plum mb-4 flex items-center gap-2 text-sm">
                <span className="icon text-primary-500">qr_code_2</span>Live Preview
              </h3>

              {/* Canvas container — QRCodeStyling appends its canvas here */}
              <div className="relative flex items-center justify-center rounded-2xl border-2 border-dashed border-primary-100 bg-white p-4">
                {/* Empty state shown when no content yet */}
                {!content && (
                  <div className="flex flex-col items-center gap-3 py-8 px-4 text-center">
                    <span className="icon text-5xl text-primary-200">qr_code</span>
                    <p className="text-xs text-plum/30 font-medium">
                      {tab === 'url' ? 'Enter a URL to generate your QR code' : 'Enter text to generate your QR code'}
                    </p>
                  </div>
                )}
                {/* The QRCodeStyling library appends a <canvas> or <svg> into this div */}
                <div ref={setContainer}
                  className="flex items-center justify-center w-full [&>canvas]:!max-w-full [&>canvas]:!h-auto [&>svg]:!max-w-full [&>svg]:!h-auto" />
              </div>

              {content && (
                <p className="mt-3 text-[11px] text-plum/40 text-center font-medium flex items-center justify-center gap-1">
                  <span className="icon text-sm text-primary-400">smartphone</span>
                  Point your phone camera at the code to test it
                </p>
              )}
            </div>

            {/* Download card */}
            <div className="bg-white rounded-3xl border border-primary-100 shadow-card p-5 flex flex-col gap-4">
              <h3 className="font-bold text-plum text-sm flex items-center gap-2">
                <span className="icon text-primary-500">download</span>Download
              </h3>

              {/* Format + Size row */}
              <div className="grid grid-cols-2 gap-3">
                {/* Format */}
                <div>
                  <label className="block text-xs font-bold text-plum/50 uppercase tracking-wider mb-1.5">Format</label>
                  <div className="relative">
                    <select value={dlFormat} onChange={e => setDlFormat(e.target.value)}
                      className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-primary-100 bg-primary-50/40 text-sm font-semibold text-plum focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all cursor-pointer">
                      <option value="png">PNG</option>
                      <option value="jpeg">JPEG</option>
                    </select>
                    <span className="icon absolute right-2 top-1/2 -translate-y-1/2 text-plum/40 pointer-events-none text-base">expand_more</span>
                  </div>
                </div>
                {/* Size */}
                <div>
                  <label className="block text-xs font-bold text-plum/50 uppercase tracking-wider mb-1.5">Size</label>
                  <div className="relative">
                    <select value={dlSize} onChange={e => setDlSize(Number(e.target.value))}
                      className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-primary-100 bg-primary-50/40 text-sm font-semibold text-plum focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all cursor-pointer">
                      <option value={128}>128×128</option>
                      <option value={256}>256×256</option>
                      <option value={512}>512×512</option>
                      <option value={640}>640×640</option>
                      <option value={800}>600×800</option>
                      <option value={1024}>1024×1024</option>
                    </select>
                    <span className="icon absolute right-2 top-1/2 -translate-y-1/2 text-plum/40 pointer-events-none text-base">expand_more</span>
                  </div>
                </div>
              </div>

              <button onClick={handleDownload} disabled={!content}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white text-sm bg-brand-gradient shadow-glow-sm hover:shadow-glow hover:scale-[1.02] active:scale-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none">
                <span className="icon text-base leading-none">download</span>
                Download QR Code
              </button>
              <button onClick={handleCopy} disabled={!content}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                  copied
                    ? 'border-green-400 text-green-600 bg-green-50'
                    : 'border-primary-200 text-primary-600 hover:bg-primary-50 hover:border-primary-400'
                }`}>
                <span className="icon text-base leading-none">{copied ? 'check_circle' : 'content_copy'}</span>
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>

            {/* Info tips card */}
            <div className="bg-primary-50 rounded-3xl border border-primary-100 p-5">
              <p className="text-xs font-bold text-primary-700 mb-2 flex items-center gap-1.5">
                <span className="icon text-sm">info</span>How it works
              </p>
              <ul className="space-y-1.5">
                {[
                  'QR encodes your URL or text directly',
                  'Any camera app can scan it — no app needed',
                  'Scanning a URL opens it in the browser',
                  'Higher error correction allows logo overlays',
                  'Works offline — nothing is sent to a server',
                ].map(tip => (
                  <li key={tip} className="text-[11px] text-primary-600/80 flex items-start gap-1.5">
                    <span className="icon text-xs text-primary-400 mt-0.5 shrink-0">check_circle</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

          </motion.div>
          {/* ════ end RIGHT PANEL ════ */}

        </div>
      </div>

      {/* ── How-to strip ── */}
      <div className="bg-white border-t border-primary-50 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-plum text-center mb-10">How to use your QR Code</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '1', icon: 'link',              title: 'Enter your URL or text',  desc: 'Paste a website link, social profile, or any text you want to encode.' },
              { step: '2', icon: 'dashboard_customize', title: 'Customise every detail', desc: 'Pick gradient colours, dot styles, eye styles, and optionally add your logo.' },
              { step: '3', icon: 'download',           title: 'Download & share',        desc: 'Download as PNG and use it on your NFC cards, flyers, or anywhere you like.' },
            ].map(s => (
              <div key={s.step} className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-glow-sm">
                  <span className="icon text-white text-2xl">{s.icon}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-primary-400 uppercase tracking-widest">Step {s.step}</span>
                  <p className="font-bold text-plum text-sm mt-0.5 mb-1">{s.title}</p>
                  <p className="text-xs text-plum/50 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </main>
  )
}
