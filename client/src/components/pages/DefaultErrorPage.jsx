import styles from "./DefaultErrorPage.module.css";

export default function DefaultErrorPage() {
  return (
    <div className={styles.container}>
      <img 
        src="https://i.pinimg.com/originals/3b/84/0b/3b840b38e4759e5c47bcd8b4cf2a2fd5.jpg" 
        alt="Фон ошибки" 
        className={styles.errorImage}
      />
      
      <div className={styles.content}>
        <h1 className={styles.title}>no no no mister fish</h1>
        <p className={styles.message}>
          you dont go to the lake, go back to the main
        </p>
        
        
        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            to the main
          </button>
        </div>
      </div>
    </div>
  );
}