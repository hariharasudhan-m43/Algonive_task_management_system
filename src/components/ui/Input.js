export default function Input({ label, type = "text", ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-slate-600">{label}</label>
      <input
        type={type}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
}
