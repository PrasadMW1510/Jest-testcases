import CDXIconLarge from 'images/gateway_assets/btn_codex.png';
import DTMIconLarge from 'images/product-assets/product-settings/DoTheMath_41x50.png';
import FADIconLarge from 'images/product-assets/product-settings/FractionNation_90x50.png';
import FMIconLarge from 'images/product-assets/product-settings/FasttMath_211x50.png';
import FMNGIconLarge from 'images/product-assets/product-settings/FasttMathNG_262x50.png';
import M180IconLarge from 'images/product-assets/product-settings/Math180_Course1_206x50.png';
import M180Y2IconLarge from 'images/product-assets/product-settings/Math180_Course2_213x50.png';
import R180IconLarge from 'images/product-assets/product-settings/Read180_EE_138x50.png';
import R180NGIconLarge from 'images/product-assets/product-settings/Read180_NG_107x50.png';
import RTIconLarge from 'images/product-assets/product-settings/rSkills_Enterprise_164x50.png';
import RTNGIconLarge from 'images/product-assets/product-settings/rSkills_CollegeCareer_205x50.png';
import S44IconLarge from 'images/product-assets/product-settings/System44_50x50.png';
import S44JRIconLarge from 'images/product-assets/product-settings/iRead_143x50.png';
import S44NGIconLarge from 'images/product-assets/product-settings/System44_NG_60x50.png';
import SMIIconLarge from 'images/product-assets/product-settings/MathInventory_178x50.png';
import SPIIconLarge from 'images/product-assets/product-settings/PhonicsInventory_181x50.png';
import SRCIconLarge from 'images/product-assets/product-settings/ReadingCounts_63x50.png';
import SRIIconLarge from 'images/product-assets/product-settings/ReadingInventory_181x50.png';
import XTIconLarge from 'images/product-assets/product-settings/Expert21_57x50.png';

import ProgramAvailableBarIcons from 'components/ProgramAvailableBar/constants';

import { PROGRAM_LIST } from './constants';

const PROGRAMS_TABLE = [
  {
    product_code: PROGRAM_LIST.CDX.code,
    settings: '',
    worksheets: '',
    portfolio: '',
    certificates: '',
    display_image: ProgramAvailableBarIcons.CDX,
    display_image_large: CDXIconLarge,
    display_name: PROGRAM_LIST.CDX.name,
  },
  {
    product_code: PROGRAM_LIST.DTM.code,
    settings: 'Settings',
    worksheets: 'Grading Tools',
    portfolio: '',
    certificates: '',
    display_image: ProgramAvailableBarIcons.DTM,
    display_image_large: DTMIconLarge,
    display_name: PROGRAM_LIST.DTM.name,
  },
  {
    product_code: PROGRAM_LIST.DTM2.code,
    settings: '',
    worksheets: '',
    portfolio: '',
    certificates: '',
    display_image: ProgramAvailableBarIcons.DTM2,
    display_image_large: DTMIconLarge,
    display_name: PROGRAM_LIST.DTM2.name,
  },
  {
    product_code: PROGRAM_LIST.E3D.code,
    settings: '',
    worksheets: 'Grading Tools',
    portfolio: '',
    certificates: '',
    display_image: ProgramAvailableBarIcons.E3D,
    display_image_large: ProgramAvailableBarIcons.E3DIcon,
    display_name: PROGRAM_LIST.E3D.name,
  },
  {
    product_code: PROGRAM_LIST.FAD.code,
    settings: 'Settings',
    worksheets: '',
    portfolio: '',
    certificates: '',
    display_image: ProgramAvailableBarIcons.FAD,
    display_image_large: FADIconLarge,
    display_name: PROGRAM_LIST.FAD.name,
  },
  {
    product_code: PROGRAM_LIST.FM.code,
    settings: 'Settings',
    worksheets: 'Worksheets',
    portfolio: '',
    certificates: 'Certificates',
    display_image: ProgramAvailableBarIcons.FM,
    display_image_large: FMIconLarge,
    display_name: PROGRAM_LIST.FM.name,
  },
  {
    product_code: PROGRAM_LIST.FMNG.code,
    settings: 'Settings',
    worksheets: 'Worksheets',
    portfolio: '',
    certificates: 'Certificates',
    display_image: ProgramAvailableBarIcons.FMNG,
    display_image_large: FMNGIconLarge,
    display_name: PROGRAM_LIST.FMNG.name,
  },
  {
    product_code: PROGRAM_LIST.M180.code,
    settings: 'Settings',
    worksheets: '',
    portfolio: 'Portfolio',
    certificates: '',
    display_image: ProgramAvailableBarIcons.M180,
    display_image_large: M180IconLarge,
    display_name: PROGRAM_LIST.M180.name,
  },
  {
    product_code: PROGRAM_LIST.M180Y2.code,
    settings: 'Settings',
    worksheets: '',
    portfolio: 'Portfolio',
    certificates: '',
    display_image: ProgramAvailableBarIcons.M180Y2,
    display_image_large: M180Y2IconLarge,
    display_name: PROGRAM_LIST.M180Y2.name,
  },
  {
    product_code: PROGRAM_LIST.R180.code,
    settings: 'Settings',
    worksheets: 'Grading Tools',
    portfolio: '',
    certificates: 'Certificates',
    display_image: ProgramAvailableBarIcons.R180,
    display_image_large: R180IconLarge,
    display_name: PROGRAM_LIST.R180.name,
  },
  {
    product_code: PROGRAM_LIST.R180NG.code,
    settings: 'Settings',
    worksheets: 'Assignments',
    portfolio: 'Portfolio',
    certificates: 'Certificates',
    display_image: ProgramAvailableBarIcons.R180NG,
    display_image_large: R180NGIconLarge,
    display_name: PROGRAM_LIST.R180NG.name,
  },
  {
    product_code: PROGRAM_LIST.R180U.code,
    settings: '',
    worksheets: 'Grading Tools',
    portfolio: '',
    certificates: '',
    display_image: ProgramAvailableBarIcons.R180U,
    display_image_large: R180IconLarge, // TO-DO No large icon provided
    display_name: PROGRAM_LIST.R180U.name,
  },
  {
    product_code: PROGRAM_LIST.RT.code,
    settings: 'Settings',
    worksheets: 'Grading Tools',
    portfolio: '',
    certificates: '',
    display_image: ProgramAvailableBarIcons.RT,
    display_image_large: RTIconLarge,
    display_name: PROGRAM_LIST.RT.name,
  },
  {
    product_code: PROGRAM_LIST.RTNG.code,
    settings: 'Settings',
    worksheets: 'Grading Tools',
    portfolio: 'Portfolio',
    certificates: '',
    display_image: ProgramAvailableBarIcons.RTNG,
    display_image_large: RTNGIconLarge,
    display_name: PROGRAM_LIST.RTNG.name,
  },
  {
    product_code: PROGRAM_LIST.S44.code,
    settings: 'Settings',
    worksheets: 'Grading Tools',
    portfolio: '',
    certificates: 'Certificates',
    display_image: ProgramAvailableBarIcons.S44,
    display_image_large: S44IconLarge,
    display_name: PROGRAM_LIST.S44.name,
  },
  {
    product_code: PROGRAM_LIST.S44JR.code,
    settings: 'Settings',
    worksheets: 'Assignments',
    portfolio: 'Portfolio',
    certificates: '',
    display_image: ProgramAvailableBarIcons.S44JR,
    display_image_large: S44JRIconLarge,
    display_name: PROGRAM_LIST.S44JR.name,
  },
  {
    product_code: PROGRAM_LIST.S44NG.code,
    settings: 'Settings',
    worksheets: 'Assignments',
    portfolio: 'Portfolio',
    certificates: 'Certificates',
    display_image: ProgramAvailableBarIcons.S44NG,
    display_image_large: S44NGIconLarge,
    display_name: PROGRAM_LIST.S44NG.name,
  },
  {
    product_code: PROGRAM_LIST.SMI.code,
    settings: 'Settings',
    worksheets: 'Grading Tools',
    portfolio: '',
    certificates: '',
    display_image: ProgramAvailableBarIcons.SMI,
    display_image_large: SMIIconLarge,
    display_name: PROGRAM_LIST.SMI.name,
  },
  {
    product_code: PROGRAM_LIST.SPI.code,
    settings: 'Settings',
    worksheets: '',
    portfolio: '',
    certificates: '',
    display_image: ProgramAvailableBarIcons.SPI,
    display_image_large: SPIIconLarge,
    display_name: PROGRAM_LIST.SPI.name,
  },
  {
    product_code: PROGRAM_LIST.SRC.code,
    settings: 'Settings',
    worksheets: 'Grading Tools',
    portfolio: '',
    certificates: 'Certificates',
    display_image: ProgramAvailableBarIcons.SRC,
    display_image_large: SRCIconLarge,
    display_name: PROGRAM_LIST.SRC.name,
  },
  {
    product_code: PROGRAM_LIST.SRI.code,
    settings: 'Settings',
    worksheets: 'Grading Tools',
    portfolio: '',
    certificates: '',
    display_image: ProgramAvailableBarIcons.SRI,
    display_image_large: SRIIconLarge,
    display_name: PROGRAM_LIST.SRI.name,
  },
  {
    product_code: PROGRAM_LIST.XT.code,
    settings: 'Settings',
    worksheets: 'Grading Tools',
    portfolio: '',
    certificates: '',
    display_image: ProgramAvailableBarIcons.XT,
    display_image_large: XTIconLarge,
    display_name: PROGRAM_LIST.XT.name,
  },
];

export default PROGRAMS_TABLE;
