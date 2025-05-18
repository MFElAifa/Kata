export default function Field({type = "text", id, placeholder, value, onChange, error, required = false}) {
    return (
        <div className="row mb-3">
            <div className="col-sm-10">
                <input type={type} placeholder={placeholder} id={id} value={value} onChange={onChange} className="form-control"  required={required}/>
                {error && <div className="text-danger mt-1">{error}</div>}
            </div>
        </div>
    )
}