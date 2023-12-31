import styles from './PhoneForm.module.css';
import KeyBoard from "../Keyboard/Keyboard"
import AgreementCheckbox from "../Checkbox/AgreementCheckbox";
import ConfirmButton from "../ConfirmButton/ConfirmButton";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {clearValidityData, getPhoneValidity} from "../../reducers/phoneValidityReducer";


export default function PhoneForm() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const {isChecked}= useSelector((state) => state.phoneForm);
    const phone =useSelector((state) => state.phoneNumber);
    const {isValid: isPhoneValid, error} = useSelector((state) => state.validNumber);
    const isPhoneLengthCorrect = phone.length === 10;
    const isConfirmDisabled = !(isChecked && isPhoneLengthCorrect && isPhoneValid);
    const dispatch = useDispatch();

    useEffect(() => {
        let template = '+7(___)___-__-__';
        phone.forEach(i => template = template.replace(/_/, i));
        setPhoneNumber(template);
    },[phone])

    useEffect(() => {
        if (phone.length === 10) {
            dispatch(getPhoneValidity(phone.join('')));
        }
        else{
            dispatch(clearValidityData());
        }

    }, [phone.length, phone, dispatch]);

    return (
        <div className={styles.phoneForm}>
            <h3 className={styles.title}>Введите ваш номер мобильного телефона</h3>
            <div className={(isPhoneValid !== null) && isPhoneValid === false && phone.length === 10 ? `${styles.phoneNumber} ${styles.error}` : styles.phoneNumber}>{phoneNumber}</div>
            <p className={styles.subtitle}>и с Вами свяжется наш менеждер для дальнейшей консультации</p>
            <KeyBoard/>
            {error && <div className={styles.validityError}>Не удалось произвести валидацию номера</div>}
            {((isPhoneValid !== null) && isPhoneValid === false && phone.length === 10) ? <div className={styles.validityError}>Неверно введен номер</div> : <AgreementCheckbox/>}
            <ConfirmButton isDisabled={isConfirmDisabled}/>
        </div>
    );
}