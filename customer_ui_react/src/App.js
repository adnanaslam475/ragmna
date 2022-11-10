import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Section from './components/Section';
import axios from "axios";
import { useAuthStore } from "./store";
import {
  FormattedMessage, IntlProvider,
  // injectIntl, FormattedDate,
} from "react-intl";
import { LOCALES } from './ii18n/locales';
import { messages } from './ii18n/messages';
import institutionswhite from './assets/institutionswhite.svg'
import institutionsblack from './assets/institutionsblack.svg'
import XMLID_1_ from './assets/XMLID_1_.svg'
import realestatewhite from './assets/realestatewhite.svg'
import realestateblack from './assets/realestateblack.svg'

import macineryblack from './assets/macineryblack.svg'
import macinerywhite from './assets/macinerywhite.svg'

import accidentwhite from './assets/accidentwhite.svg'
import accidentblack from './assets/accidentblack.svg'
import { Alert, Grid } from '@mui/material';

// import Fotoerabove from './assets/footerabove.svg'
// import Fotoerblw from './assets/footerbelow.svg'

const arr = [{
  name: 'realestate', on: realestatewhite, off: realestateblack,
}, { name: 'instit', on: institutionswhite, off: institutionsblack, },
{ name: 'machine', on: macinerywhite, off: macineryblack, },
{ name: 'vehcleacc', on: accidentwhite, off: accidentblack, }]

function App() {
  const [seletc, setselect] = useState('realestate')
  const [regions, setregions] = useState([])
  const [qoutenumber, setQouteNumber] = useState(null)
  const [countries, setcountries] = useState([])
  const [districts, setdistricts] = useState([])
  const [cities, setcities] = useState([])
  const [purposes, setpurposes] = useState([])
  const [conditions, setconditions] = useState([])
  const [openLoginmodal, setOpenLoginModal] = useState(false)
  const [{ dir, lang, }, dispatch] = useAuthStore();


  useEffect(() => {
    const l = localStorage.getItem('lang')
    if (!!l) {
      dispatch({ type: 'LANG', payload: l ? l : 'en-' })
    }
  }, [])

  const purposelistF = async () => {
    try {
      const purposelist = await axios.get(
        "https://dev-pvq-api.herokuapp.com/cust/purpose-list"
      );
      setpurposes(purposelist.data.items)
    } catch (error) {
      console.log("eroere", error);
    } finally {
    }
  };

  const ctylistF = async () => {
    try {
      const citylist = await axios.get(
        "https://dev-pvq-api.herokuapp.com/cust/city-list"
      );
      setcities(citylist.data.items)
    } catch (error) {
      console.log("eroere", error);
    } finally {
    }
  };

  const countryF = async () => {
    try {
      const citylist = await axios.get(
        "https://dev-pvq-api.herokuapp.com/cust/country-list"
      );
      setcountries(citylist.data.items)
    } catch (error) {
      console.log("eroere", error);
    } finally {
    }
  };

  const districtf = async () => {
    try {
      const districts = await axios.get(
        "https://dev-pvq-api.herokuapp.com/cust/district-list"
      );
      setdistricts(districts.data.items)
    } catch (error) {
      console.log("eroere", error);
    } finally {
    }
  };

  const rgnF = async () => {
    try {
      const rgns = await axios.get(
        "https://dev-pvq-api.herokuapp.com/cust/region-list"
      );
      setregions(rgns.data.items)
    } catch (error) {
      console.log("eroere", error);
    } finally {
    }
  };

  const cnditionf = async () => {
    try {
      const cndition = await axios.get(
        "https://dev-pvq-api.herokuapp.com/cust/condition-list"
      );
      setconditions(cndition.data.items)
    } catch (error) {
      console.log("eroere", error);
    } finally {
    }
  };
  const qoute = async () => {
    try {
      const boy = JSON.stringify({
        title
          :
          "Real Estate",
        category
          :
          "LAND",
      })
      const res = await axios.post(
        "https://dev-pvq-api.herokuapp.com/cust/new-quote", boy,
        { headers: { 'content-type': 'application/json' } }
      );
      console.log('res', res.data.data)
      setQouteNumber(res.data?.data)
    } catch (error) {
      console.log("eroere", error);
    } finally {
    }
  };

  useEffect(() => {
    qoute();
    purposelistF();
    ctylistF();
    countryF();
    districtf();
    rgnF();
    cnditionf();
  }, []);

  console.log('purpose', dir);

  return (
    <IntlProvider
      messages={messages[lang]}
      locale={lang}
      defaultLocale={LOCALES.ENGLISH}>
      <Header modalHandler={() => setOpenLoginModal(true)} />
      <div
        style={{ minHeight: '600px', }}
        className='first__section d-flex flex-column m-auto align-items-center justify-content-center'>
        <h1>
          <FormattedMessage id='banner' />
        </h1>
        <p>
          <FormattedMessage id='banner_p' />
        </p>
        <div className='d-flex flex-row'>
          {arr.map(v => <div
            key={v.name} onClick={() => setselect(v.name)}
            className='text-center outerone'>
            <div className='outerround'>
              <div className='inner d-flex align-items-center justify-content-center' style={{
                backgroundColor: v.name == seletc ? 'blue' : 'white',
              }}>
                <img src={v.name == seletc ? v.on : v.off} className='' alt='' />
              </div>
            </div>
            <p className='mt-3'
              style={{ fontWeight: 400, color: v.name == seletc ? 'blue' : 'black' }}>
              <FormattedMessage id={v.name} />
            </p>
          </div>)}
        </div>
      </div>

      {/* //first info section  */}
      <Grid className='first m-auto' container>
        <Grid item md={6} className='d-flex' xs={12} lg={6} xl={6} sm={6}>
          <img src={XMLID_1_} alt='' className='m-auto' />
        </Grid>
        <Grid item md={6} xs={12} lg={6} xl={6} sm={6} className='d-flex flex-column m-auto'>
          <h2>
            <FormattedMessage id='abouttheplatform' />
          </h2>
          <p><FormattedMessage id='ourgoal' values={{
            b: (chunks) => <strong>{chunks}</strong>
          }} /></p>
        </Grid>
      </Grid>

      {/* //second  info section  */}
      <Grid className='first m-auto' container>
        <Grid item md={6} xs={12} lg={6} xl={6} sm={6} className='d-flex flex-column m-auto'>
          <h2>
            <FormattedMessage id='ourproducts' />
          </h2>
          <FormattedMessage id='obtaineval' />
          <ul>
            <li>
              <FormattedMessage id='realstateeval' />
              <p><FormattedMessage id='getval' /></p>
            </li>
            <li><FormattedMessage id='businessval' />
              <p><FormattedMessage id='gettrueval' /></p>
            </li>
          </ul>

        </Grid>
        <Grid item md={6} className='d-flex' xs={12} lg={6} xl={6} sm={6}>
          <img src={XMLID_1_} alt='' className='m-auto' />
        </Grid>
      </Grid>


      {/* <------------------third info section--------------> */}
      <Grid className='first m-auto' container>
        <Grid item md={6} className='d-flex' xs={12} lg={6} xl={6} sm={6}>
          <img src={XMLID_1_} alt='' className='m-auto' />
        </Grid>
        <Grid item md={6} xs={12} lg={6} xl={6} sm={6} className='d-flex flex-column m-auto'>
          <h2>
            <FormattedMessage id='ourproducts' />
          </h2>
          <FormattedMessage id='obtaineval' />
          <ul>
            <li>
              <FormattedMessage id='mequip' />
            </li>
            <li><FormattedMessage id='vahiceldamage' />
              <p><FormattedMessage id='gettrueval' /></p>
            </li>
          </ul>
        </Grid>
      </Grid>

      {/* <------------------foutrth info section--------------> */}

      <Grid className='first m-auto' container>
        <Grid item md={6} xs={12} lg={6} xl={6} sm={6} className='d-flex flex-column m-auto'>
          <h2>
            <FormattedMessage id='steps' />
          </h2>
          <ul>
            <li>
              <FormattedMessage id='generalsteps' />
            </li>
            <li>
              <FormattedMessage id='contct' />
            </li>
            <li>
              <FormattedMessage id='ifassets' />
            </li>
          </ul>
        </Grid>
        <Grid item md={6} className='d-flex' xs={12} lg={6} xl={6} sm={6}>
          <img src={XMLID_1_} alt='' className='m-auto' />
        </Grid>
      </Grid>

      <Alert className='ml-auto mr-auto mt-5 mb-5 text-center d-flex align-items-center justify-content-center'
        style={{ maxWidth: '500px', }} severity="success">
        <FormattedMessage id='urquote' />
        <p>{qoutenumber}</p>
      </Alert>
      <Section
        regions={regions} countries={countries}
        districts={districts}
        cities={cities}
        purposes={purposes}
        conditions={conditions}
      />
      <Footer />
      {/* <AuthModal /> */}
      {openLoginmodal && <AuthModal />}
    </IntlProvider>
  );
}

export default App;
