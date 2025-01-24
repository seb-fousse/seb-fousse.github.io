import ShuffledGallery from '@/components/Gallery/ShuffledGallery.component';
import data from '@public/data/work/art.json';

export default function Art() {
  return (
    <div>
      <ShuffledGallery 
        title="Selection of Art From 2019" 
        subtitle="click & drag images" 
        data={data} 
        delay={1.5}
      />
    </div>
  );
}