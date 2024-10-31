// types
import { PaymentOptionsProps } from 'types/e-commerce';

// assets
const sendwave = '/assets/images/e-commerce/sendwave.png';
// const card = '/assets/images/e-commerce/card.png';
const cod = '/assets/images/e-commerce/cod.png';

// ==============================|| CHECKOUT - PAYMENT OPTIONS ||============================== //

const PaymentOptions: PaymentOptionsProps[] = [
  {
    id: 1,
    value: 'sendwave',
    title: 'Payer avec Sendwave',
    caption: 'Vous pouvez payer sécurisément avec votre téléphone.',
    image: sendwave,
    size: {
      width: 60,
      height: 48
    }
  },
  {
    id: 3,
    value: 'cod',
    title: 'Cash à main',
    caption: 'Vous pouvez payer cash au livreur.',
    image: cod,
    size: {
      width: 60,
      height: 36
    }
  }
];

export default PaymentOptions;
