import type { JSX } from 'react';
import styles from './Legal.module.scss';

export function LegalEs(): JSX.Element {
  return (
    <>
      <h1 className={styles.title}>Aviso legal</h1>

      <section className={styles.section}>
        <h2 className={styles.heading}>Editor</h2>
        <p className={styles.body}>
          MakeSomeNoise es un proyecto educativo desarrollado en el marco del plan de estudios de la
          escuela 42 (ft_transcendence), sin finalidad comercial. Publicado por los miembros del
          equipo (afaugero, anaudibe, jbayonne, mpelage). Contacto: makesomenoise_team@gmail.com.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Director de publicación</h2>
        <p className={styles.body}>Por completar.</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Alojamiento</h2>
        <p className={styles.body}>
          El sitio está alojado en la infraestructura del proyecto (makesomenoise.com).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Propiedad intelectual</h2>
        <p className={styles.body}>
          El código fuente, el diseño y los contenidos originales del sitio son propiedad de sus
          autores. Los contenidos creados por los usuarios (sesiones, samples, exportaciones) siguen
          siendo propiedad de dichos usuarios (véanse las condiciones de uso).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Tecnologías de terceros</h2>
        <p className={styles.body}>
          Las herramientas de audio (estudio) se basan en la tecnología de código abierto{' '}
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
          , utilizado conforme a su licencia.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Descargo de responsabilidad</h2>
        <p className={styles.body}>
          Este sitio se ha creado con fines educativos en el marco del programa 42. No tiene ninguna
          finalidad comercial.
        </p>
      </section>
    </>
  );
}
