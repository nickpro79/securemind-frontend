import { Component } from '@angular/core';
import { Modal } from 'bootstrap'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css'
})
export class ExercisesComponent {
  exercises = [
    {
      title: '30 Minute Yoga for Anxiety Relief',
      description: "Relax with our Yoga for Anxiety Relief session, designed to ease tension and calm your mind.",
      url: 'https://www.youtube.com/embed/7cqzSNgNo1M',
      thumbnailUrl: 'https://img.youtube.com/vi/7cqzSNgNo1M/maxresdefault.jpg'
    },
    {
      title: 'Pranayama to Calm your Mind ',
      description: 'Daily practices to cool, calm, and focus your mind with Chandra Bhedana Pranayama.',
      url: 'https://youtu.be/uNmKzlh55Fo',
      thumbnailUrl: 'https://i3.ytimg.com/vi/uNmKzlh55Fo/0.jpg'
    },
    {
      title: 'Yoga Nidra for Deep Sleep',
      description: 'A simple practice of Yoga Nidra holds the power to change you completely.',
      url: 'https://www.youtube.com/watch?v=uPSml_JQGVY&list=PLe1px9-uNQTqk7Ks-dMlHpd0HuRjUs52n&index=2',
      thumbnailUrl: 'https://i3.ytimg.com/vi/uPSml_JQGVY/0.jpg'
    },
    {
      title: 'Meditation For Stress and Anxiety',
      description: " Relax and release tension from your body and mind from physical sensations and thoughts.",
      url: 'https://www.youtube.com/watch?v=w4tlGeSrcNw&list=PLBCxhRAIgwOPPhgF1euMnWGNyjy257qdR&index=1',
      thumbnailUrl: 'https://i3.ytimg.com/vi/w4tlGeSrcNw/0.jpg'
    },
    {
      title: '5-Minute Meditation ',
      description: 'Mediation to relax your body and mind anytime anywhere.',
      url: 'https://www.youtube.com/watch?v=inpok4MKVLM',
      thumbnailUrl: 'https://i3.ytimg.com/vi/inpok4MKVLM/0.jpg'
    },
    {
      title: 'Mental Reset in 5 Minutes ',
      description: 'Get help for anxiety and stress with this short and quick 5 minute guided meditation',
      url: 'https://youtu.be/ztTexqGQ0VI?si=xYLDJNmQimlvAWto',
      thumbnailUrl: 'https://i3.ytimg.com/vi/ztTexqGQ0VI/0.jpg'
    }
  ];
  constructor(private sanitizer: DomSanitizer) {}

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
