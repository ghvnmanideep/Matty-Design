// src/components/EditNavbar.jsx
import React from "react";
import {
  FaShapes,
  FaCircle,
  FaDrawPolygon,
  FaSlash,
  FaFont,
  FaEraser,
  FaUndo,
  FaRedo,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaUpload,
  FaPaintBrush,
  FaImage,
  FaFilePdf,
  FaSave,
} from "react-icons/fa";

export default function EditNavbar({
  onRect,
  onCircle,
  onEllipse,
  onLine,
  onTriangle,
  onText,
  onClear,
  onUndo,
  onRedo,
  onColorChange,
  onPaintToggle,
  isPainting,
  onExportPNG,
  onExportPDF,
  onDelete,
  onBringForward,
  onSendBackward,
  onSaveDesign,
  onUploadImageClick,
}) {
  
  // Custom button component for consistent styling
  const ToolButton = ({ onClick, icon: Icon, label, isActive, danger }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-200 group relative
        ${isActive 
          ? "bg-red-500/20 text-red-400 border border-red-500/30" 
          : "text-gray-400 hover:bg-white/10 hover:text-white border border-transparent"}
        ${danger && !isActive ? "hover:bg-red-500/10 hover:text-red-400" : ""}
      `}
      title={label}
    >
      <Icon className={`text-lg mb-1 ${isActive ? "drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" : ""}`} />
      <span className="text-[10px] font-medium leading-none">{label}</span>
    </button>
  );

  return (
    <div className="bg-[#151720] border-b border-white/5 w-full shadow-md z-40 relative">
      <div className="flex items-center px-4 py-3 overflow-x-auto gap-2 no-scrollbar scroll-smooth">
        
        {/* Draw Tools Group */}
        <div className="flex items-center gap-1.5 p-1.5 bg-black/20 rounded-2xl border border-white/5">
          <ToolButton onClick={onRect} icon={FaShapes} label="Rect" />
          <ToolButton onClick={onCircle} icon={FaCircle} label="Circle" />
          <ToolButton 
            onClick={onEllipse} 
            icon={() => <span className="text-xl leading-none">◯</span>} 
            label="Ellipse" 
          />
          <ToolButton onClick={onTriangle} icon={FaDrawPolygon} label="Triangle" />
          <ToolButton onClick={onLine} icon={FaSlash} label="Line" />
        </div>

        <div className="w-px h-10 bg-white/10 mx-1 shrink-0" />

        {/* Content Tools Group */}
        <div className="flex items-center gap-1.5 p-1.5 bg-black/20 rounded-2xl border border-white/5">
          <ToolButton onClick={onText} icon={FaFont} label="Text" />
          <ToolButton onClick={onUploadImageClick} icon={FaUpload} label="Upload" />
          <ToolButton 
            onClick={onPaintToggle} 
            icon={FaPaintBrush} 
            label="Brush" 
            isActive={isPainting}
          />
          
          {/* Color Picker */}
          <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden group">
            <input
              type="color"
              onChange={(e) => onColorChange(e.target.value)}
              className="absolute inset-0 w-20 h-20 -top-2 -left-2 cursor-pointer opacity-0 z-10"
              title="Pick Color"
            />
            <div className="w-5 h-5 rounded-full border-2 border-white/80 mb-1 shadow-sm relative z-0 bg-gradient-to-tr from-red-500 to-blue-500"></div>
            <span className="text-[10px] font-medium text-gray-400 group-hover:text-white leading-none z-0">Color</span>
          </div>
        </div>

        <div className="w-px h-10 bg-white/10 mx-1 shrink-0" />

        {/* Layer & History Group */}
        <div className="flex items-center gap-1.5 p-1.5 bg-black/20 rounded-2xl border border-white/5">
          <ToolButton onClick={onBringForward} icon={FaArrowUp} label="Up" />
          <ToolButton onClick={onSendBackward} icon={FaArrowDown} label="Down" />
          <ToolButton onClick={onUndo} icon={FaUndo} label="Undo" />
          <ToolButton onClick={onRedo} icon={FaRedo} label="Redo" />
        </div>

        <div className="w-px h-10 bg-white/10 mx-1 shrink-0" />

        {/* Action Group */}
        <div className="flex items-center gap-1.5 p-1.5 bg-black/20 rounded-2xl border border-white/5 shrink-0">
          <ToolButton onClick={onExportPNG} icon={FaImage} label="PNG" />
          <ToolButton onClick={onExportPDF} icon={FaFilePdf} label="PDF" />
          
          <button
            onClick={onSaveDesign}
            className="flex items-center gap-2 px-4 h-14 rounded-xl font-semibold text-sm text-white ml-1 transition-all duration-200 hover:scale-[1.03] hover:shadow-lg hover:shadow-green-900/30"
            style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)" }}
          >
            <FaSave />
            Save
          </button>
        </div>

        {/* Destructive Tools Group - Aligned to right if space permits */}
        <div className="flex items-center gap-1.5 p-1.5 bg-black/20 rounded-2xl border border-white/5 shrink-0 ml-auto">
          <ToolButton onClick={onDelete} icon={FaTrash} label="Delete" danger />
          <ToolButton onClick={onClear} icon={FaEraser} label="Clear" danger />
        </div>

      </div>
    </div>
  );
}
