import { Component } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {
  articles = [
    {
      title: 'Stress Management Techniques For Students: How To Decrease Stress Level',
      description: 'For many students, going to college can be synonymous with experiencing high levels of stress. While a certain level of stress may be ...',
      link: 'https://www.betterhelp.com/advice/students/stress-management-techniques-for-students-how-to-decrease-stress-levels/',
      imageUrl: 'https://assets.betterhelp.com/advice/images/682f8384526e507724319611e224aba9-summer-depression-why-seasonal-affective-disorder-is-not-limited-to-the-winter_10_l.jpg' 
    },
    {
      title: 'How Harnessing Willpower To Meet Your Goals Can Change Your Life',
      description: 'Willpower can be a powerful tool to help you reach your goals and change your life. However, it’s not always easy to exercise this type of self-control even in the best of times......',
      link: 'https://www.betterhelp.com/advice/willpower/how-harnessing-willpower-to-meet-your-goals-can-change-your-life/',
      imageUrl: 'https://dy7glz37jgl0b.cloudfront.net/advice/images/b0c659f3b45ab03ffbecf781f227798b-older-woman-speaks-on-phone-to-client_l.jpg' 
    },
    {
      title: 'How to harness ambition in life for positive outcomes',
      description: 'At its core, ambition can be a compelling force that motivates individuals to chase their goals and strive for success. It often plays an important role in personal growth.....',
      link: 'https://www.betterhelp.com/advice/ambition/how-to-harness-ambition-in-life-for-positive-outcomes/',
      imageUrl: 'https://dy7glz37jgl0b.cloudfront.net/advice/images/341c509086ff5067842a0d7027315868-girl-holding-mug-smiling-by-computer_l.jpg' // Replace with the actual image URL
    },
    {
      title: 'How Do I Stop Feeling Overwhelmed And Anxious?',
      description: "Many people report feeling overwhelmed and anxious at times. Multiple responsibilities at work and in one's personal life, as well as concerns about physical health and uncertainty",
      link: 'https://www.betterhelp.com/advice/anxiety/how-do-i-stop-feeling-overwhelmed-and-anxious/',
      imageUrl: 'https://dy7glz37jgl0b.cloudfront.net/advice/images/7f4685e00038abbc9ca7c6aa7f834a5d-girl-clutches-head-on-couch_l.jpg' 
    },
    {
      title: 'How Harnessing Willpower To Meet Your Goals Can Change Your Life',
      description: 'Willpower can be a powerful tool to help you reach your goals and change your life. However, it’s not always easy to exercise this type of self-control even in the best of times......',
      link: 'https://www.betterhelp.com/advice/willpower/how-harnessing-willpower-to-meet-your-goals-can-change-your-life/',
      imageUrl: 'https://dy7glz37jgl0b.cloudfront.net/advice/images/b0c659f3b45ab03ffbecf781f227798b-older-woman-speaks-on-phone-to-client_l.jpg' 
    },
    {
      title: 'How to harness ambition in life for positive outcomes',
      description: 'At its core, ambition can be a compelling force that motivates individuals to chase their goals and strive for success. It often plays an important role in personal growth.....',
      link: 'https://www.betterhelp.com/advice/ambition/how-to-harness-ambition-in-life-for-positive-outcomes/',
      imageUrl: 'https://dy7glz37jgl0b.cloudfront.net/advice/images/341c509086ff5067842a0d7027315868-girl-holding-mug-smiling-by-computer_l.jpg' // Replace with the actual image URL
    }
  ];
}
