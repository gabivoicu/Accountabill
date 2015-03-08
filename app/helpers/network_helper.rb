helpers do
  def find_sector(sector)
    case sector
    when "A"
      sector = "Agribusiness"
    when "B"
      sector = "Communications/Electronics"
    when "C"
      sector = "Construction"
    when "D"
      sector = "Defense"
    when "E"
      sector = "Energy/Natural Resources"
    when "F"
      sector = "Finance/Insurance/Real Estate"
    when "H"
      sector = "Health"
    when "K"
      sector = "Lawyers and Lobbyists"
    when "M"
      sector = "Transportation"
    when "N"
      sector = "Misc. Business"
    when "Q"
      sector = "Ideology/Single Issue"
    when "P"
      sector = "Labor"
    when "W"
      sector = "Other"
    when "Y"
      sector = "Unknown"
    when "Z"
      sector = "Administrative Use"
    end
  end
end


# A: Agribusiness, B: Communications/Electronics, C: Construction, D: Defense, E: Energy/Natural Resources, F: Finance/Insurance/Real Estate, H: Health, K: Lawyers and Lobbyists, M: Transportation, N: Misc. Business, Q: Ideology/Single Issue, P: Labor, W: Other, Y: Unknown, Z: Administrative Use 
