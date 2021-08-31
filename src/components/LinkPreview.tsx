import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import styles from '../styles/components/LinkPreview.module.css'

export function LinkPreview () {
  const { previewItems } = useContext(AppContext)
  
  console.log(previewItems);
  
  if(!Object.keys(previewItems).length) return null;

  const imageUrl = previewItems.image ?? '/images/empty.jpeg'
  return (
    <section className={styles.container}>
      <img loading="lazy" src={imageUrl} className={styles.image} alt={previewItems.title}/>
      <div className={styles.content}>
        <h2 className={styles.title} title={previewItems.title}>{previewItems.title}</h2>
        {previewItems.description && 
          <p title={previewItems.description} className={styles.description}>{previewItems.description}</p>
        }
        {previewItems.origin && 
          <pre className={styles.origin}>{previewItems.origin}</pre>
        }
      </div>
    </section>
  )
}