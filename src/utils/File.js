import PNG from '@assets/icon/png.svg';
import PDF from '@assets/icon/pdf.svg';
import JPG from '@assets/icon/jpg.svg';
import JPEG from '@assets/icon/jpeg.svg';
export const getExtensionFile = (filename) => {
    const extension = filename.split('.').pop();
    switch(extension) {
        case 'png':
            return PNG;
        case 'pdf':
            return PDF;
        case 'jpg':
            return JPG;
        case 'jpeg':
            return JPEG;
        default:
            return '';
      }
}