// src/shared/utils/confirmDialog.ts
import Swal from 'sweetalert2';

type ConfirmDialogOptions = {
    text: string;
    title?: string;
    confirmText?: string;
    cancelText?: string;
};

export const confirmDialog = async (
    options: ConfirmDialogOptions,
    onConfirm: () => Promise<string> // เปลี่ยนจาก void เป็น string
): Promise<void> => {
    const {
        title = 'ลบข้อมูล',
        confirmText = 'ใช่',
        cancelText = 'ยกเลิก',
    } = options;

    const result = await Swal.fire({
        title,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
    });

    if (result.isConfirmed) {
        try {
            const message = await onConfirm(); // รับข้อความจาก backend

            await Swal.fire({
                icon: 'success',
                title: message || 'Success', // ถ้าไม่มีข้อความ fallback เป็น "Success"
                confirmButtonText: 'OK',
                target: document.body,
            });

        } catch (error) {
            console.error("ข้อผิดพลาดในการยืนยัน", error);
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'มีบางอย่างผิดปกติ!',
                target: document.body,
            });
        }
    }
};


export const alertDialog = async (
    title: string,
    text: string,
    icon: 'success' | 'error' | 'warning' | 'info' = 'info'
): Promise<void> => {
    await Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'OK',
        target: document.body,
    });
};

