import type { JSX } from 'react';
import styles from './Terms.module.scss';

export function TermsEs(): JSX.Element {
  return (
    <>
      <h1 className={styles.title}>Condiciones de uso</h1>
      <p className={styles.updated}>Última actualización: por completar</p>

      <section className={styles.section}>
        <h2 className={styles.heading}>1. Objeto</h2>
        <p className={styles.body}>
          Estas condiciones rigen el uso de la plataforma MakeSomeNoise, cuyas herramientas de audio
          se basan en la tecnología de código abierto{' '}
          <a
            className={styles.link}
            href="https://github.com/andremichelle/openDAW"
            target="_blank"
            rel="noreferrer"
          >
            openDAW
          </a>
          , a través del SDK{' '}
          <a
            className={styles.link}
            href="https://github.com/andremichelle/openDAW-headless"
            target="_blank"
            rel="noreferrer"
          >
            openDAW-headless
          </a>
          . Al crear una cuenta, las aceptas.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>2. Cuenta</h2>
        <p className={styles.body}>
          Debes facilitar información veraz al registrarte. Eres responsable de mantener la
          confidencialidad de tus credenciales y de la actividad de tu cuenta.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>3. Uso aceptable</h2>
        <p className={styles.body}>
          Te comprometes a no: publicar contenido ilícito, de odio o que vulnere los derechos de
          terceros; subir samples o audio sobre los que no tengas derechos; ni alterar el servicio
          (abuso técnico, intentos de intrusión).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>4. Contenido y propiedad</h2>
        <p className={styles.body}>
          Conservas la propiedad de las creaciones musicales, sesiones, samples y exportaciones que
          produzcas. Concedes a MakeSomeNoise una licencia limitada, únicamente para alojar y
          mostrar ese contenido dentro del servicio. Eres el único responsable del contenido que
          subas.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>5. Funciones colaborativas</h2>
        <p className={styles.body}>
          Algunas funciones (sesiones en tiempo real, uso compartido) exponen tu contenido según la
          visibilidad que elijas (privada, compartida, pública). Mantienes el control de estos
          ajustes.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>6. Suspensión y baja</h2>
        <p className={styles.body}>
          Podemos suspender una cuenta en caso de incumplimiento de estas condiciones. Puedes
          eliminar tu cuenta en cualquier momento desde la página Ajustes.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>7. Disponibilidad y responsabilidad</h2>
        <p className={styles.body}>
          El servicio se presta «tal cual», en el marco de un proyecto educativo de 42, sin garantía
          de disponibilidad continua. No podemos ser considerados responsables de la pérdida de
          datos ni de la indisponibilidad del servicio.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>8. Cambios</h2>
        <p className={styles.body}>
          Estas condiciones pueden modificarse; la versión vigente es la publicada en esta página.
        </p>
      </section>
    </>
  );
}
