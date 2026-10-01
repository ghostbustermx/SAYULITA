import { useState } from 'react';
import { FiCalendar, FiSearch } from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';
import { BsHouseDoor } from 'react-icons/bs';
import DateField from '../ui/DateField';
import './SearchBar.css';

const i18n = {
  ENG: {
    arrive: "Arrive",
    depart: "Depart",
    bedrooms: "Bedrooms",
    bedroom1: "1 Bedroom",
    bedroom2: "2 Bedrooms",
    bedroom3: "3 Bedrooms",
    bedroom4: "4 Bedrooms",
    bedroom5: "5+ Bedrooms",
    propertyType: "Property Type",
    typeHouse: "House",
    typeVilla: "Villa",
    typeCondo: "Condo",
    typeApartment: "Apartment",
    typeHotel: "Boutique Hotel",
    search: "Search"
  },
  ESP: {
    arrive: "Llegada",
    depart: "Salida",
    bedrooms: "Recámaras",
    bedroom1: "1 Recámara",
    bedroom2: "2 Recámaras",
    bedroom3: "3 Recámaras",
    bedroom4: "4 Recámaras",
    bedroom5: "5+ Recámaras",
    propertyType: "Tipo de Propiedad",
    typeHouse: "Casa",
    typeVilla: "Villa",
    typeCondo: "Condominio",
    typeApartment: "Departamento",
    typeHotel: "Hotel Boutique",
    search: "Buscar"
  }
};

export default function SearchBar({ language = 'ENG' }) {
  const t = i18n[language] || i18n.ENG;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bedrooms, setBedrooms] = useState('');
  const [propertyType, setPropertyType] = useState('');

  return (
    <div className="search-bar" id="search-bar">
      <div className="search-bar__field search-bar__field--dates">
        <div className="search-bar__icon"><FiCalendar size={18} /></div>
        <div className="search-bar__date-range">
          <DateField
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText={t.arrive}
            dateFormat="MMM d"
            minDate={new Date()}
            id="search-arrive"
          />
          <span className="search-bar__date-sep">–</span>
          <DateField
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || new Date()}
            placeholderText={t.depart}
            dateFormat="MMM d"
            id="search-depart"
          />
        </div>
      </div>

      <div className="search-bar__divider" />

      <div className="search-bar__field">
        <div className="search-bar__icon"><IoBedOutline size={18} /></div>
        <select
          className="search-bar__select"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          id="search-bedrooms"
          aria-label={t.bedrooms}
        >
          <option value="">{t.bedrooms}</option>
          <option value="1">{t.bedroom1}</option>
          <option value="2">{t.bedroom2}</option>
          <option value="3">{t.bedroom3}</option>
          <option value="4">{t.bedroom4}</option>
          <option value="5">{t.bedroom5}</option>
        </select>
      </div>

      <div className="search-bar__divider" />

      <div className="search-bar__field">
        <div className="search-bar__icon"><BsHouseDoor size={18} /></div>
        <select
          className="search-bar__select"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          id="search-property-type"
          aria-label={t.propertyType}
        >
          <option value="">{t.propertyType}</option>
          <option value="house">{t.typeHouse}</option>
          <option value="villa">{t.typeVilla}</option>
          <option value="condo">{t.typeCondo}</option>
          <option value="apartment">{t.typeApartment}</option>
          <option value="hotel">{t.typeHotel}</option>
        </select>
      </div>

      <button className="search-bar__btn" id="search-submit">
        <FiSearch size={18} />
        <span>{t.search}</span>
      </button>
    </div>
  );
}
