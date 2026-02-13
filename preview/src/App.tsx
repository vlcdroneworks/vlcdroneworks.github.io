import { useEffect, useState } from 'react';
import { 
  Menu, X, ChevronDown, Play, Camera, 
  Settings, Building2, Video, Phone, 
  Mail, Instagram, CheckCircle, Map, Cog, Plane
} from 'lucide-react';

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#quienes-somos', label: 'Quienes Somos' },
    { href: '#servicios', label: 'Servicios' },
    // { href: '#portfolio', label: 'Portfolio' },  // Oculto temporalmente
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-vdw-navy/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-vdw-orange to-amber-500 flex items-center justify-center">
              <Plane className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-lg md:text-xl">Valencia</span>
              <span className="text-vdw-orange font-bold text-lg md:text-xl"> Drone</span>
              <span className="text-white font-bold text-lg md:text-xl"> Works</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-vdw-orange transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-vdw-navy/95 backdrop-blur-md pb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 px-4 text-white/80 hover:text-vdw-orange hover:bg-white/5 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-vdw-navy/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full bg-gradient-to-br from-vdw-orange to-amber-500 flex items-center justify-center mb-6 shadow-2xl">
              <Plane className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
              Valencia <span className="text-vdw-orange">Drone</span> Works
            </h1>
          </div>

          {/* Tagline */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Filmaciones <span className="text-vdw-orange">aéreas</span> profesionales
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#servicios" 
              className="px-8 py-4 bg-vdw-orange hover:bg-amber-600 text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              Ver Servicios
            </a>
            <a 
              href="#contacto" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full backdrop-blur-sm transition-all border border-white/30"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>

      {/* Version Badge */}
      <div className="absolute bottom-8 right-8 bg-vdw-orange/90 text-white px-4 py-2 rounded-full text-sm font-medium">
        V26.0
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/60" />
      </div>
    </section>
  );
}

// Section Header Component
function SectionHeader({ title, subtitle, accentWord }: { title: string; subtitle?: string; accentWord?: string }) {
  const parts = accentWord ? title.split(accentWord) : [title];
  
  return (
    <div className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&q=80)' }}
      >
        <div className="absolute inset-0 bg-vdw-navy/80" />
      </div>
      
      {/* Orange Accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 md:w-24 h-32 md:h-48 bg-vdw-orange rounded-r-3xl" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-24 md:pl-32">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
          {accentWord ? (
            <>
              {parts[0]}<span className="text-vdw-orange">{accentWord}</span>{parts[1] || ''}
            </>
          ) : title}
        </h2>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/70">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="quienes-somos" className="relative">
      <SectionHeader 
        title="Quienes somos" 
        subtitle="Presentación del equipo"
        accentWord=" somos"
      />
      
      <div className="bg-vdw-navy py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-center">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              <span className="text-vdw-orange font-semibold">Valencia Drone Works</span> nace de la colaboración de un equipo de pilotos de drones <span className="text-vdw-orange">expertos</span> en vuelo FPV (First Person View) y estabilizado.
            </p>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Somos un equipo multidisciplinar que trabaja de cerca con sus <span className="text-vdw-orange">clientes</span>, cuidando los <span className="text-vdw-orange">detalles</span> de cada proyecto desde la planificación hasta la edición final, sacando el máximo partido a los diferentes tipos de drones que componen nuestra flota.
            </p>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Contamos con la <span className="text-vdw-orange">experiencia</span> necesaria para hacer realidad tus proyectos, volando tanto en exteriores como interiores, consiguiendo los planos aéreos que necesitas en tus producciones audiovisuales, videos corporativos, promocionales, deportivos, sociales, etc.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Team Section
function TeamSection() {
  const pilots = [
    {
      name: 'Alejandro Plá',
      image: '/img/alejandro.jpg',
      description: 'Piloto de dron con gran experiencia en el <span class="text-vdw-orange">sector audiovisual</span> como operador de steadicam/cámara'
    },
    {
      name: 'Mark Barrachina',
      image: '/img/mark.jpg',
      description: 'Piloto de dron <span class="text-vdw-orange">polivalente</span>, cámara, y <span class="text-vdw-orange">editor</span> de video y fotografía.'
    },
    {
      name: 'Sergio García',
      image: '/img/sergio.jpg',
      description: 'Piloto de dron cinemático y de <span class="text-vdw-orange">interiores</span>, para aquellas grabaciones que requieren precisión'
    }
  ];

  return (
    <section className="bg-vdw-navy-light py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 md:mb-16">
          Nuestros <span className="text-vdw-orange">pilotos</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {pilots.map((pilot, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6 mx-auto w-48 h-48 md:w-56 md:h-56">
                <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-vdw-orange/30 group-hover:border-vdw-orange transition-colors">
                  <img 
                    src={pilot.image} 
                    alt={pilot.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{pilot.name}</h3>
              <p 
                className="text-white/70 text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: pilot.description }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Types for media items
type MediaItem = {
  image: string;
  videoUrl: string;
};

// Drone Service Card
function DroneServiceCard({ 
  title, 
  subtitle,
  drone, 
  recording, 
  idealUse, 
  strengths, 
  media,
  accentColor = 'vdw-orange'
}: { 
  title: string;
  subtitle?: string;
  drone: string;
  recording: string;
  idealUse: string;
  strengths: string[];
  media: MediaItem | MediaItem[];
  accentColor?: string;
}) {
  // Select random media item if array provided
  const mediaArray = Array.isArray(media) ? media : [media];
  const [selectedMedia] = useState(() => 
    mediaArray[Math.floor(Math.random() * mediaArray.length)]
  );
  
  const handlePlayClick = () => {
    window.open(selectedMedia.videoUrl, '_blank');
  };
  
  return (
    <div className="relative bg-vdw-navy/60 backdrop-blur-sm rounded-2xl overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${selectedMedia.image})` }}
      >
        <div className="absolute inset-0 bg-vdw-navy/85" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-6 md:p-10">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-4xl font-bold mb-2">
            {title.split(' ').map((word, i) => (
              <span key={i} className={i === 0 ? `text-vdw-${accentColor}` : 'text-white'}>
                {word}{' '}
              </span>
            ))}
          </h3>
          {subtitle && <p className="text-white/70 text-sm md:text-base">{subtitle}</p>}
        </div>
        
        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <span className="text-vdw-orange font-semibold">Drones:</span>
              <span className="text-white/90 ml-2">{drone}</span>
            </div>
            <div>
              <span className="text-vdw-orange font-semibold">Grabación:</span>
              <span className="text-white/90 ml-2">{recording}</span>
            </div>
            <div>
              <span className="text-vdw-orange font-semibold">Uso ideal:</span>
              <span className="text-white/90 ml-2">{idealUse}</span>
            </div>
            <div>
              <span className="text-vdw-orange font-semibold block mb-2">Fortalezas:</span>
              <ul className="space-y-1">
                {strengths.map((strength, i) => (
                  <li key={i} className="text-white/80 text-sm flex items-start gap-2">
                    <span className="text-vdw-orange mt-1">-</span>
                    <span dangerouslySetInnerHTML={{ 
                      __html: strength.replace(/<span class="text-vdw-orange">(.*?)<\/span>/g, '<span class="text-vdw-orange">$1</span>') 
                    }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Video Placeholder */}
          <div 
            className="relative aspect-video rounded-xl overflow-hidden bg-black/30 group cursor-pointer"
            onClick={handlePlayClick}
          >
            <img 
              src={selectedMedia.image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-vdw-orange/80 transition-colors">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Aerial Services Section
function AerialServicesSection() {
  return (
    <section id="servicios" className="relative">
      <SectionHeader 
        title="Grabaciones aéreas" 
        subtitle="Grabación y fotografía aérea con drones"
        accentWord="aéreas"
      />
      
      <div className="bg-vdw-navy py-12 md:py-20 space-y-8 md:space-y-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Interior Recording */}
          <DroneServiceCard
            title="Grabación interiores"
            subtitle="Drones FPV polivalentes para planos de proximidad e interiores"
            drone='DJI Avata 2 / Cinewhoop 3"'
            recording="4K 50fps D-Log M 10 bits"
            idealUse="Tours interiores, empresas, comercios, eventos indoor, hoteles, oficinas, etc..."
            strengths={[
              'Seguro para volar cerca de personas y objetos.',
              'Tomas muy estables en espacios estrechos.',
              'Permite <span class="text-vdw-orange">plano secuencia</span> fluido y altamente inmersivo.',
              'Aporta dinamismo sin riesgo y con estética moderna.'
            ]}
            media={[
              { image: '/img/interiores-1.jpg', videoUrl: 'https://www.youtube.com/watch?v=8ImPizCcFcw' },
              { image: '/img/interiores-2.jpg', videoUrl: 'https://www.youtube.com/watch?v=XWDfxyvIix0' }
            ]}
          />

          {/* Public Events */}
          <DroneServiceCard
            title="Eventos con público"
            subtitle="Drones FPV de pequeño tamaño para planos de proximidad e interiores con poco espacio."
            drone='Cinewhoop 2-2.5"'
            recording="4K 50fps D-Log M 10 bits"
            idealUse="conciertos, festivales, ferias, corporativo."
            strengths={[
              'Vuelo seguro incluso a muy poca altura.',
              'Planos cercanos del público y artista.',
              'Sensación de <span class="text-vdw-orange">estar dentro del evento</span>.',
              'Energía visual sin comprometer la seguridad.'
            ]}
            media={{ image: '/img/publico-1.jpg', videoUrl: 'https://www.youtube.com/watch?v=7n-vaE7qVHI' }}
          />

          {/* Action/Following */}
          <DroneServiceCard
            title="Acción / Seguimiento"
            subtitle="Dron FPV de mayor tamaño y velocidad para tomas de acción y/o seguimientos"
            drone='Dron FPV 5-7"'
            recording="4K 50fps D-Log M 10 bits"
            idealUse="deportes, vehículos, escenas rápidas y/o persecuciones."
            strengths={[
              'Velocidad, potencia y gran capacidad de maniobra.',
              'Vuelos acrobáticos o de seguimiento a <span class="text-vdw-orange">alta velocidad</span>.',
              'Planos únicos que transmiten adrenalina pura.'
            ]}
            media={{ image: '/img/accion-1.jpg', videoUrl: 'https://www.youtube.com/watch?v=6kFuLprN4yA' }}
          />

          {/* Stable Shots */}
          <DroneServiceCard
            title="Tomas estables"
            subtitle="Drones estabilizados para diferentes necesidades de vuelo"
            drone="DJI Mini 5 Pro"
            recording="4K 50fps D-Log M 10 bits"
            idealUse="planos generales, urbanos, naturaleza, redes sociales, proyectos rápidos."
            strengths={[
              'Ligero, silencioso y muy estable.',
              'Imagen limpia para <span class="text-vdw-orange">tomas calmadas o estáticas</span>.',
              'Ideal donde se requiere discreción o baja huella sonora.'
            ]}
            media={[
              { image: '/img/estables-1.jpg', videoUrl: 'https://www.youtube.com/watch?v=J9wTErdDX2I' },
              { image: '/img/estables-2.jpg', videoUrl: 'https://www.youtube.com/watch?v=a7oVsDdYp6Y' }
            ]}
          />

          {/* Maximum Quality */}
          <DroneServiceCard
            title="Calidad máxima"
            subtitle="Drones estabilizados y/o FPV para producciones exigentes"
            drone='DJI Mavic 4 Pro / Cinelifter 8"'
            recording="6K 50fps D-Log 10 bits HDR"
            idealUse="publicidad, documentales, TV, proyectos cinemáticos."
            strengths={[
              'Más rango dinámico, sensores superiores y teleobjetivo.',
              'Planos aéreos con <span class="text-vdw-orange">máxima calidad, nitidez y fidelidad</span>.',
              'Imagen de nivel profesional apta para producciones exigentes.'
            ]}
            media={{ image: '/img/publicidad-1.jpg', videoUrl: 'https://www.youtube.com/watch?v=Qot6fJoMooA' }}
          />
        </div>
      </div>
    </section>
  );
}

// Ground Recording Section
function GroundRecordingSection() {
  return (
    <section className="relative">
      <SectionHeader 
        title="Grabaciones en tierra" 
        subtitle="Fotografía y/o video con cámara 4K y estabilizador"
        accentWord="tierra"
      />
      
      <div className="bg-vdw-navy py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-vdw-navy/60 backdrop-blur-sm rounded-2xl overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80)' }}
            >
              <div className="absolute inset-0 bg-vdw-navy/85" />
            </div>
            
            <div className="relative z-10 p-6 md:p-10">
              <h3 className="text-2xl md:text-4xl font-bold mb-8">
                <span className="text-white">Grabación</span> <span className="text-vdw-orange">4K</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Camera */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <Camera className="w-12 h-12 text-vdw-orange" />
                    <h4 className="text-xl font-bold text-white">Cámara</h4>
                  </div>
                  <div className="space-y-2 text-white/90">
                    <p><span className="text-vdw-orange font-semibold">Cámara:</span> Sony Alpha 7c II</p>
                    <p><span className="text-vdw-orange font-semibold">Grabación:</span> 4K 50fps SLOG3, S-Cinetone, 10 bits 4:2:2</p>
                    <p><span className="text-vdw-orange font-semibold">Lentes:</span> Sony 16-25 f2.8 y Sony 24-70 f2.8 GMII</p>
                    <p><span className="text-vdw-orange font-semibold">Uso ideal:</span> para todo tipo de trabajos no aéreos.</p>
                    <div className="mt-4">
                      <span className="text-vdw-orange font-semibold">Fortalezas:</span>
                      <ul className="mt-2 space-y-1 text-white/80">
                        <li>- versatilidad híbrida para fotografía y video</li>
                        <li>- calidad de imagen superior con sensor full frame de 33 megapixels</li>
                        <li>- enfoque automático inteligente</li>
                        <li>- video de alta gama</li>
                        <li>- estabilización de 5 ejes</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Stabilizer */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <Settings className="w-12 h-12 text-vdw-orange" />
                    <h4 className="text-xl font-bold text-white">Estabilizador</h4>
                  </div>
                  <div className="space-y-2 text-white/90">
                    <p><span className="text-vdw-orange font-semibold">Estabilizador:</span> DJI RS 4 Mini</p>
                    <p><span className="text-vdw-orange font-semibold">Uso ideal:</span> en tomas y planos que requieren de la máxima estabilización y fluidez.</p>
                    <div className="mt-4">
                      <span className="text-vdw-orange font-semibold">Fortalezas:</span>
                      <ul className="mt-2 space-y-1 text-white/80">
                        <li>- planos suaves y estables</li>
                        <li>- híbrido horizontal/vertical</li>
                        <li>- seguimiento y composición inteligente</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Real Estate Section
function RealEstateSection() {
  return (
    <section className="relative">
      <SectionHeader 
        title="Activos Inmobiliarios" 
        subtitle="Servicios específicos para constructoras y/o inmobiliarias"
        accentWord="Inmobiliarios"
      />
      
      <div className="bg-vdw-navy py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-vdw-navy/60 backdrop-blur-sm rounded-2xl overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80)' }}
            >
              <div className="absolute inset-0 bg-vdw-navy/85" />
            </div>
            
            <div className="relative z-10 p-6 md:p-10">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Left Column */}
                <div>
                  <div className="inline-flex items-center gap-3 bg-vdw-orange/90 text-white px-4 py-2 rounded-full mb-6">
                    <Building2 className="w-5 h-5" />
                    <span className="font-medium">Filmación aérea de bienes inmuebles</span>
                  </div>
                  <ul className="space-y-3 text-white/90">
                    <li className="flex items-start gap-2">
                      <span className="text-vdw-orange mt-1">-</span>
                      <span><span className="text-vdw-orange">Residenciales:</span> viviendas unifamiliares, apartamentos, edificios de viviendas, urbanizaciones, etc.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-vdw-orange mt-1">-</span>
                      <span><span className="text-vdw-orange">Comerciales:</span> oficinas, locales, hoteles, restaurantes, centros comerciales, parkings, concesionarios, gimnasios, ocio, etc.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-vdw-orange mt-1">-</span>
                      <span><span className="text-vdw-orange">Industriales:</span> naves, almacenes, fábricas, etc.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-vdw-orange mt-1">-</span>
                      <span><span className="text-vdw-orange">Infraestructuras y terrenos:</span> infraestructuras públicas y privadas, terrenos, parcelas, etc.</span>
                    </li>
                  </ul>
                </div>
                
                {/* Right Column */}
                <div>
                  <div className="inline-flex items-center gap-3 bg-vdw-blue/90 text-white px-4 py-2 rounded-full mb-6">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Ventajas que ofrecen los drones</span>
                  </div>
                  <ul className="space-y-3 text-white/90">
                    <li className="flex items-start gap-2">
                      <span className="text-vdw-blue mt-1">-</span>
                      <span>Marketing aéreo de <span className="text-vdw-blue">alto impacto</span> visual que incrementa y acelera tus ventas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-vdw-blue mt-1">-</span>
                      <span>Foto y video inmobiliario que genera una mayor <span className="text-vdw-blue">conexión</span> emocional.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-vdw-blue mt-1">-</span>
                      <span>Recorridos virtuales <span className="text-vdw-blue">inmersivos</span></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-vdw-blue mt-1">-</span>
                      <span>Visualización del entorno</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-vdw-blue mt-1">-</span>
                      <span>Seguimiento de <span className="text-vdw-blue">Obras</span></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-vdw-blue mt-1">-</span>
                      <span><span className="text-vdw-blue">Renders 3D</span></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-vdw-blue mt-1">-</span>
                      <span>Reducción de costes: <span className="text-vdw-blue">alternativa económica</span> frente a métodos tradicionales (helicópteros/grúas).</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Portfolio Section (Oculto temporalmente)
export function PortfolioSection() {
  const portfolioImages = [
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1518173946687-a4c036bc3c95?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=300&h=200&fit=crop',
  ];

  return (
    <section id="portfolio" className="bg-vdw-navy py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            <span className="text-vdw-orange">Portfolio</span> General
          </h2>
          <p className="text-white/70 max-w-2xl">
            Muchos de nuestros trabajos no pueden ser publicados. Debido a eso, el acceso al portfolio debe ser autorizado por un miembro de <span className="text-vdw-orange font-semibold">Valencia Drone Works</span>.
          </p>
        </div>
        
        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {portfolioImages.map((img, index) => (
            <div 
              key={index} 
              className="aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
            >
              <img 
                src={img} 
                alt={`Portfolio ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Overview Section
function ServicesOverviewSection() {
  const services = [
    {
      icon: Map,
      title: 'Planificación del proyecto',
      description: 'Nos encargamos de todo desde la idea inicial hasta la entrega final.',
      color: 'bg-vdw-beige'
    },
    {
      icon: Building2,
      title: 'Activos Inmobiliarios',
      description: 'Servicios exclusivos para constructoras y/o inmobiliarias.',
      color: 'bg-vdw-orange'
    },
    {
      icon: Video,
      title: 'Grabación aérea y terrestre',
      description: 'Cubrimos una amplia gama de necesidades de grabación aérea y de grabación de video 4K con estabilizador.',
      color: 'bg-vdw-blue'
    },
    {
      icon: Cog,
      title: 'Edición de video',
      description: 'Si no tienes quien edite las imágenes y monte el video final, nosotros podemos hacerlo.',
      color: 'bg-vdw-pink'
    }
  ];

  return (
    <section id="servicios" className="relative">
      <SectionHeader 
        title="Nuestros Servicios" 
        subtitle="Servicios generales (presupuestos a medida)"
        accentWord="Servicios"
      />
      
      <div className="bg-vdw-navy py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-12">
            Nuestros <span className="text-vdw-orange">servicios</span>
          </h3>
          
          {/* Service Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`${service.color} rounded-3xl p-6 transition-transform duration-300`}
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">{service.title}</h4>
                <p className="text-white/80 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
          
          <p className="mt-12 text-white/60 text-sm text-center">
            * Cumplimos todos los requisitos y tramitamos los permisos necesarios para volar incluso en entornos urbanos y espacios controlados (CTR, ATZ, etc.)
          </p>
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)' }}
      >
        <div className="absolute inset-0 bg-vdw-navy/85" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="flex items-start gap-6">
            <span className="text-6xl md:text-8xl font-bold text-white">54</span>
            <p className="text-white/90 text-lg md:text-xl mt-4">
              Solicitudes de coordinación realizadas para espacio controlado (<span className="text-vdw-orange">CTR/ATZ/ZRVF</span>)
            </p>
          </div>
          
          <div className="flex items-start gap-6">
            <span className="text-6xl md:text-8xl font-bold text-white">68</span>
            <p className="text-white/90 text-lg md:text-xl mt-4">
              Operaciones realizadas en <span className="text-vdw-blue">entorno urbano</span> del territorio nacional (conciertos, eventos deportivos, videos promocionales, parques acuáticos, con animales, etc.)
            </p>
          </div>
          
          <div className="flex items-start gap-6">
            <span className="text-6xl md:text-8xl font-bold text-white">~24</span>
            <p className="text-white/90 text-lg md:text-xl mt-4">
              Operaciones realizadas en <span className="text-vdw-pink">interiores</span> (museos, exposiciones, conciertos, videos promocionales, espectáculos, ferias y/o eventos, etc.)
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-right">
          <h3 className="text-3xl md:text-5xl font-bold text-white">
            Nuestro <span className="text-vdw-orange">2025</span>
          </h3>
        </div>
      </div>
    </section>
  );
}

// Clients Section
function ClientsSection() {
  const clients = [
    'Rojas Arena', 'Palau Ducal', 'Marina', 'Garaje', 'Maratón Valencia',
    'Bioparc', 'Feria Valencia', 'Tyris', 'Noatum', 'À Punt',
    'JFS Architectes', 'Gran Circo Wonderland', 'Tedi', 'Vedat Import', 'Somos5',
    'La Bolera Campanar', 'CAHH', 'ERRE', 'Mar de Sons', 'Festardor',
    'Galmed', 'UMA Gym', 'Fran Motor Show', 'Botanic', 'HybridBox'
  ];

  return (
    <section className="bg-vdw-navy py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl md:text-4xl font-bold text-white mb-12">
          Nuestros <span className="text-vdw-orange">Clientes</span>
        </h3>
        
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className="aspect-[3/2] bg-white/10 rounded-lg flex items-center justify-center p-4 hover:bg-white/20 transition-colors"
            >
              <span className="text-white/80 text-xs md:text-sm font-medium text-center">{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  return (
    <section id="contacto" className="relative min-h-screen flex items-center">
      <div className="grid md:grid-cols-2 w-full min-h-screen">
        {/* Left - Content */}
        <div className="flex items-center justify-center bg-vdw-cream p-8 md:p-16">
          <div className="max-w-md">
            <h2 className="text-5xl md:text-7xl font-bold text-vdw-orange mb-8">
              Contacto
            </h2>
            <p className="text-vdw-navy text-lg mb-8">
              Nos puedes contactar en:
            </p>
            
            <div className="space-y-4">
              <a 
                href="https://instagram.com/valenciadroneworks" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-vdw-navy hover:text-vdw-orange transition-colors"
              >
                <Instagram className="w-6 h-6" />
                <span>@valenciadroneworks</span>
              </a>
              <a 
                href="mailto:info@valenciadroneworks.com" 
                className="flex items-center gap-4 text-vdw-navy hover:text-vdw-orange transition-colors"
              >
                <Mail className="w-6 h-6" />
                <span>info@valenciadroneworks.com</span>
              </a>
              <a 
                href="tel:+34668831105" 
                className="flex items-center gap-4 text-vdw-navy hover:text-vdw-orange transition-colors"
              >
                <Phone className="w-6 h-6" />
                <span>+34 668 831 105</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Right - Image */}
        <div 
          className="hidden md:block bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80)',
            clipPath: 'ellipse(100% 100% at 100% 50%)'
          }}
        />
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-vdw-navy border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-vdw-orange flex items-center justify-center">
              <Plane className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold">Valencia Drone Works</span>
          </div>
          <p className="text-white/60 text-sm">
            © 2026 Valencia Drone Works. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  return (
    <div className="min-h-screen bg-vdw-navy">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <AerialServicesSection />
      <GroundRecordingSection />
      <RealEstateSection />
      {/* <PortfolioSection /> */}  {/* Oculto temporalmente */}
      <ServicesOverviewSection />
      <StatsSection />
      <ClientsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;

