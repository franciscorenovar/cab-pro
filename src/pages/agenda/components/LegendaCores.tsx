
const LegendaCores = () => {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FFB8BA' }}></div>
        <span className="text-sm">Bloqueado</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#B8D4FF' }}></div>
        <span className="text-sm">Disponível</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#B8FFB8' }}></div>
        <span className="text-sm">Reservado</span>
      </div>
    </div>
  );
};

export default LegendaCores;
