FactoryGirl.define do
  factory :mark_kirk, class: Politician do
    bio_id    "K000360"
    entity_id "048563d4685b4fcab08889881f066fff"
    firstname "Mark"
    lastname  "Kirk"
  end

  factory :danny_davis, class: Politician do
    bio_id    "D000096"
    entity_id "776e8941d0cc408e9cc9cdfed00c6ce9"
    firstname "Danny"
    lastname  "Davis"
  end

  factory :dick_durbin, class: Politician do
    bio_id    "D000563"
    entity_id "4e1c4ae720fb45fcaca0afc9a098dc97"
    firstname "Richard"
    lastname  "Durbin"
  end
end
