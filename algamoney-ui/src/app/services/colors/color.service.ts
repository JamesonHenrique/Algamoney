import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

 private colors = ['indigo', 'purple', 'amber', 'green', 'red', 'bluerose'];

  getColorPair(index: number): { bgColor: string; textColor: string } {
    const colorIndex = index % this.colors.length;
    const color = this.colors[colorIndex];
    return {
      bgColor: `var(--color-${color}-100)`,
      textColor: `var(--color-${color}-600)`
    };
  }
}
