const Map = () => {
  const lat = 21.00306075140016;
  const lng = 105.73359012686907;

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=15&output=embed`}
        title="AgriBeacon Office Location"
      />
    </div>
  );
};

export default Map;
