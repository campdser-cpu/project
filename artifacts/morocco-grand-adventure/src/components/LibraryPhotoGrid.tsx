import type { PhotoAsset } from '@/data/photoLibrary';
import { photoSrcSet } from '@/data/photoLibrary';

/**
 * Official Photo Library grid — renders the ACTUAL photographs published from
 * the official Photo Library PDF (one JPEG per Asset ID under /images/library/).
 * Only publishable assets (verification 'approved' + published src) reach the
 * DOM; restricted assets never enter rendered output.
 *
 * i18n: photos carry factual descriptions verbatim from the library; optional
 * `headingKey`/`subKey` are translated by the caller.
 */
interface Props {
  photos: PhotoAsset[];
  aspect?: string;
  sizes?: string;
  figCaption?: boolean;
  priorityFirst?: boolean;
}

export default function LibraryPhotoGrid({
  photos,
  aspect = 'h-64 md:h-80',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  figCaption = true,
  priorityFirst = false,
}: Props) {
  if (photos.length === 0) return null;
  return (
    <div className={`grid gap-5 ${photos.length > 1 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'max-w-3xl mx-auto'}`}>
      {photos.map((photo, i) => (
        <figure key={photo.assetId} className="group rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
          <div className={`relative overflow-hidden ${aspect}`}>
            <img
              src={photo.src ?? ''}
              srcSet={photoSrcSet(photo)}
              alt={photo.alt}
              title={photo.title}
              width={photo.width}
              height={photo.height}
              sizes={sizes}
              loading={priorityFirst && i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={priorityFirst && i === 0 ? 'high' : undefined}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span
              className="absolute top-2 left-2 bg-background/85 text-muted-foreground text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full border border-border"
              aria-hidden="true"
            >
              {photo.assetId}
            </span>
          </div>
          {figCaption && (
            <figcaption className="px-4 py-3 text-sm text-muted-foreground leading-relaxed">{photo.description}</figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}