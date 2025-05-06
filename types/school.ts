export interface School {
  id?: number | string; // Agar db.json da id bo'lsa
  name: string;
  location: string;
  overallStudentCount: number;
  overallStaffCount: number;
  overallClassCount: number;
  about: string;
  phoneNumber: string;
}
