import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function horaEntregaValidator(fechaEntregaControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const horaEntrega = control.value;
      const fechaEntrega = fechaEntregaControl.value;
  
      if (!horaEntrega || !fechaEntrega) {
        return null; // No validar si no hay valor
      }
  
      const fechaHoraEntrega = new Date(fechaEntrega);
      fechaHoraEntrega.setHours(horaEntrega.getHours(), horaEntrega.getMinutes(), horaEntrega.getSeconds());
  
      const ahora = new Date();
      const horaActualMasDosHoras = new Date(ahora.getTime() + 2 * 60 * 60 * 1000);      
      if (fechaHoraEntrega <= horaActualMasDosHoras) {
        return { horaEntregaInvalida: true };
      }
  
      return null;
    };
  }