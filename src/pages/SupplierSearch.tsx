import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowLeft, Search, MapPin, Factory, Shield, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Supplier {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  verified: boolean;
  responseTime: string;
  languages: string[];
  certifications: string[];
  products: string[];
  image: string;
}

const mockSuppliers: Supplier[] = [
  {
    id: 'sup-001',
    name: 'TechGlobal Manufacturing',
    category: 'Электроника',
    location: 'Китай, Шанхай',
    rating: 4.8,
    verified: true,
    responseTime: '2 часа',
    languages: ['EN', 'ZH', 'RU'],
    certifications: ['ISO 9001', 'CE', 'FCC'],
    products: ['Смартфоны', 'Планшеты', 'IoT устройства'],
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 'sup-002',
    name: 'EuroChem Solutions',
    category: 'Химия',
    location: 'Германия, Берлин',
    rating: 4.9,
    verified: true,
    responseTime: '1 час',
    languages: ['DE', 'EN', 'RU'],
    certifications: ['REACH', 'ISO 14001', 'TÜV'],
    products: ['Химические реагенты', 'Пигменты', 'Краски'],
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 'sup-003',
    name: 'Tokyo Precision Tools',
    category: 'Инструменты',
    location: 'Япония, Токио',
    rating: 4.7,
    verified: true,
    responseTime: '3 часа',
    languages: ['JA', 'EN'],
    certifications: ['JIS', 'ISO 9001'],
    products: ['Точные инструменты', 'Станки', 'Аксессуары'],
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 'sup-004',
    name: 'Moscow Textile Factory',
    category: 'Текстиль',
    location: 'Россия, Москва',
    rating: 4.6,
    verified: true,
    responseTime: '1 час',
    languages: ['RU', 'EN'],
    certifications: ['ГОСТ', 'ISO 9001'],
    products: ['Хлопковые ткани', 'Полиэстер', 'Фурнитура'],
    image: 'https://via.placeholder.com/150'
  },
];

export default function SupplierSearch() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const categories = ['Все', 'Электроника', 'Химия', 'Текстиль', 'Инструменты', 'Металлы', 'Пластик'];
  const regions = ['Все', 'Азия', 'Европа', 'Россия', 'Северная Америка', 'Австралия'];

  const filteredSuppliers = mockSuppliers.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.products.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Все' || s.category === selectedCategory;
    const matchesRegion = selectedRegion === '' || selectedRegion === 'Все' || 
                         (selectedRegion === 'Россия' && s.location.includes('Россия')) ||
                         (selectedRegion === 'Европа' && ['Германия', 'Франция', 'Италия', 'Великобритания'].some(c => s.location.includes(c))) ||
                         (selectedRegion === 'Азия' && ['Китай', 'Япония', 'Корея', 'Индия'].some(c => s.location.includes(c)));
    
    return matchesSearch && matchesCategory && matchesRegion;
  });

  return (
    <section ref={ref} className="min-h-screen bg-black text-white py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-12"
        >
          <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={18} />
            <span>Назад</span>
          </Link>
          <h1 className="text-2xl font-medium">Поиск поставщиков</h1>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-4 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Поиск по названию или продукту..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
            >
              {categories.map(c => (
                <option key={c} value={c} className="bg-gray-800">{c}</option>
              ))}
            </select>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
            >
              {regions.map(r => (
                <option key={r} value={r} className="bg-gray-800">{r}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Suppliers Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredSuppliers.map((supplier, index) => (
            <motion.div
              key={supplier.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/20 to-white/10 flex-shrink-0" />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-white font-medium text-lg">{supplier.name}</h3>
                    {supplier.verified && (
                      <Shield className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  
                  <div className="text-white/60 text-sm mb-3">
                    <MapPin size={14} className="inline w-4 h-4 mr-1" />
                    {supplier.location}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-white/50 mb-3">
                    <span>Рейтинг: {supplier.rating}/5</span>
                    <span>Ответ: {supplier.responseTime}</span>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-white/50 mb-1">Продукты:</div>
                    <div className="flex flex-wrap gap-1">
                      {supplier.products.slice(0, 3).map(p => (
                        <span key={p} className="text-xs bg-white/10 px-2 py-1 rounded-full">
                          {p}
                        </span>
                      ))}
                      {supplier.products.length > 3 && (
                        <span className="text-xs text-white/40">...</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-white/50 mb-1">Сертификаты:</div>
                    <div className="flex flex-wrap gap-1">
                      {supplier.certifications.map(c => (
                        <span key={c} className="text-xs text-white/40">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button className="mt-4 w-full py-2 bg-white text-black text-sm font-medium rounded-xl hover:bg-white/90 transition-colors">
                Связаться с поставщиком
              </button>
            </motion.div>
          ))}
        </motion.div>

        {filteredSuppliers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center py-12"
          >
            <Factory size={64} className="mx-auto text-white/20 mb-4" />
            <h3 className="text-white text-xl font-medium mb-2">Поставщики не найдены</h3>
            <p className="text-white/50">Попробуйте изменить фильтры поиска</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}