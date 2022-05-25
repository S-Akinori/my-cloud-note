import { style } from "@mui/system"
import ReactMarkdown from "react-markdown"
import styles from './index.module.css'

interface Props {
  children: string
}
const Markdown = ({children}: Props) => {
  return(
    <ReactMarkdown className={styles.markdown}>{children}</ReactMarkdown>
  )
}

export default Markdown