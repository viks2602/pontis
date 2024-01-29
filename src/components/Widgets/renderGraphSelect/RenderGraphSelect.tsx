import { Dataset2 } from "../../../interfaces/widgetInterface"

interface Props {
  value: string,
  options: Dataset2[],
  handleChange:(e:React.ChangeEvent<HTMLSelectElement>, options: Dataset2[]) => void
}

const RenderGraphSelect = ({value, handleChange, options}: Props) => {
    return ( 
        <select
          value={value}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>handleChange(e, options)}
          style={{
            border:'1px solid rgba(238, 238, 238, 1)',
            padding:'8px 12px',
            borderRadius:'3px',
            maxWidth:'160px'
          }}
        >
          {options.map((option, index:number)=>{
            return (
                <option key={index} value={option.label}>{option.label}</option>
            )
        })}
      </select>
      )
}

export default RenderGraphSelect