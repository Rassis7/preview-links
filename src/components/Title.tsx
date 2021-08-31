import React from "react";
import styles from '../styles/components/Title.module.css'

export const Title: React.VFC = () => (
    <h1 className={styles.title}>
        Cole um link e aguarde o <span>preview</span> ser gerado!
    </h1>
)