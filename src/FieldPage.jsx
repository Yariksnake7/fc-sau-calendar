  return (
    <div style={{color: '#fff', textAlign: 'center', marginTop: 40}}>
      {/* <h2>Управление составом</h2> */}
      <Pitch squad={squad} setSquad={setSquad} />
      {user.role === 'coach' && (
        <button className="btn" style={{marginTop: 24, fontSize: 18}} onClick={handleSave}>
          Сохранить состав
        </button>
      )}
      {saved && <div style={{color:'#e30613', marginTop:8}}>Состав сохранён!</div>}
    </div>
  ); 