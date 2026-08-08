import type { JSX } from 'react';
import styles from './Privacy.module.scss';

export function PrivacyEs(): JSX.Element {
  return (
    <>
      <h1 className={styles.title}>Política de privacidad</h1>
      <p className={styles.updated}>Última actualización: por completar</p>

      <p className={styles.intro}>
        MakeSomeNoise es un proyecto educativo desarrollado en el marco del plan de estudios de la
        escuela 42. Esta política explica qué datos personales recogemos y cómo se utilizan.
      </p>

      <section className={styles.section}>
        <h2 className={styles.heading}>1. Responsable del tratamiento</h2>
        <p className={styles.body}>
          Tus datos son tratados por el equipo del proyecto MakeSomeNoise. Contacto: por completar.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>2. Datos que recogemos</h2>
        <ul className={styles.list}>
          <li>
            Cuenta: dirección de correo electrónico, contraseña (almacenada con hash, nunca en texto
            plano), nombre, apellidos, nombre artístico.
          </li>
          <li>Perfil: avatar y enlaces externos que facilites.</li>
          <li>
            Contenido: sesiones, samples, exportaciones y proyectos que crees en la plataforma.
          </li>
          <li>Datos técnicos: la cookie de sesión necesaria para la autenticación.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>3. Finalidades</h2>
        <p className={styles.body}>
          Estos datos se usan únicamente para crear y gestionar tu cuenta, ofrecer las herramientas
          creativas (estudio, grabadora, mezclador) y hacer funcionar las funciones sociales
          (seguimiento, sesiones colaborativas, chat).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>4. Base jurídica</h2>
        <p className={styles.body}>
          El tratamiento se basa en la prestación del servicio que solicitas al crear una cuenta.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>5. Conservación de los datos</h2>
        <p className={styles.body}>
          Tus datos se conservan mientras tu cuenta esté activa. Se eliminan cuando borras tu cuenta
          (desde la página Ajustes) o cuando lo solicitas.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>6. Cookies</h2>
        <p className={styles.body}>
          Solo usamos una cookie de sesión de autenticación, imprescindible para el funcionamiento
          del sitio. Sin cookies publicitarias ni de seguimiento de terceros.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>7. Comunicación de datos</h2>
        <p className={styles.body}>
          Ningún dato se vende ni se cede a terceros. Los datos se alojan en nuestra propia
          infraestructura (por completar).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>8. Tus derechos (RGPD)</h2>
        <p className={styles.body}>
          Tienes derecho de acceso, rectificación, supresión y portabilidad de tus datos. La
          eliminación de la cuenta está disponible directamente desde la página Ajustes; para
          cualquier otra solicitud, escríbenos a: por completar.
        </p>
      </section>
    </>
  );
}
